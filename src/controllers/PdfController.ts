import { Request, Response } from 'express'
import { PdfService } from '../services/pdfService'
import { addPdfJob } from '../queues/pdfQueue'
import logger from '../utils/logger'

const pdfService = new PdfService()

export class PdfController {
  async uploadPdf(req: Request, res: Response | any): Promise<void> {
    const { pdfUrl } = req.body
    if (!pdfUrl) {
      logger.error('pdf url is required')
      return res.status(400).send('PDF URL is required')
    }
    try {
      addPdfJob(pdfUrl)
      const { pdfPath, thumbnailPath } = await pdfService.processPdf(pdfUrl)
      res.status(200).json({
        message: 'PDF is being processed',
        pdfPath,
        thumbnailPath,
      })
    } catch (error) {
      logger.error(error)
      res.status(500).send('Error processing PDF')
    }
  }
  async getPdfList(req: Request, res: Response | any): Promise<void> {
    try {
      const result = await pdfService.getPdfList()
      res.status(200).json(result)
    } catch (error) {
      logger.error(error)
      res.status(500).send('Error getting PDF')
    }
  }
}
