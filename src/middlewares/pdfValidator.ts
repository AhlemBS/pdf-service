import { body, validationResult } from 'express-validator'
import logger from '../utils/logger'
export const validatePdfUrl = [
  body('pdfUrl').isURL().withMessage('Invalid PDF URL'),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      logger.error('pdf url is invalid')
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]
