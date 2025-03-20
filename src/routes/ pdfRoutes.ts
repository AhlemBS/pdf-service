import express from 'express'
import { PdfController } from '../controllers/PdfController'
import { validatePdfUrl } from '../middlewares/pdfValidator'
import { uploadLimiter } from '../middlewares/rateLimiter'

const router = express.Router()
const pdfController = new PdfController()

router.post(
  '/upload-pdf',
  uploadLimiter,
  validatePdfUrl,
  pdfController.uploadPdf,
)
router.get('/list-pdf', uploadLimiter, pdfController.getPdfList)

export default router
