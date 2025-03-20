import Bull from 'bull'
import { PdfService } from '../services/pdfService'
import logger from '../utils/logger'

const pdfService = new PdfService()
export const pdfQueue = new Bull('pdf-queue', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
})

export const addPdfJob = (pdfUrl: string) => {
  pdfQueue.add({ pdfUrl })
}

pdfQueue.process(async (job) => {
  try {
    const { pdfUrl } = job.data
    await pdfService.downloadPdf(pdfUrl)
    logger.info(`Uploaded PDF from URL: ${pdfUrl}`)
  } catch (error) {
    logger.error(`Error processing job ${job.id}:`, error)

    throw error
  }
})
