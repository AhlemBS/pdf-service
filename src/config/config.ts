import dotenv from 'dotenv'

dotenv.config()

export const config = {
  puppeteerLaunchOptions: {
    headless: process.env.PUPPETEER_HEADLESS === 'true',
    slowMo: parseInt(process.env.PUPPETEER_SLOWMO || '0'),
  },
  pdfStorageDir: process.env.PDF_STORAGE_DIR || './uploads',
}
