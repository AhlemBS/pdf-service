import puppeteer from 'puppeteer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { config } from '../config/config';
import logger from '../utils/logger';

export class PdfService {
  private pdfList: { pdfUrl: string; pdfPath: string; thumbnailPath: string }[] = [];

  async downloadPdf(pdfUrl: string): Promise<string> {
    const pdfFilename = `downloaded-${Date.now()}.pdf`;
    const pdfPath = path.join(config.pdfStorageDir, pdfFilename);

    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(pdfPath, response.data);
    logger.info(`PDF downloaded to ${pdfPath}`)
    return pdfPath;
  }

  async createThumbnail(pdfPath: string): Promise<string> {
    const browser = await puppeteer.launch(config.puppeteerLaunchOptions);
    const page = await browser.newPage();

    await page.goto(`file://${path.resolve(pdfPath)}`, { waitUntil: 'networkidle0' });

    const thumbnailPath = path.join(config.pdfStorageDir, `thumbnail-${Date.now()}.png`);
    await page.screenshot({ path: thumbnailPath });

    logger.info(`Thumbnail saved to ${thumbnailPath}`)

    await browser.close();

    return thumbnailPath;
  }

  async processPdf(pdfUrl: string): Promise<{ pdfPath: string; thumbnailPath: string }> {
    const pdfPath = await this.downloadPdf(pdfUrl);
    const thumbnailPath = await this.createThumbnail(pdfPath);
    this.pdfList.push({
      pdfUrl: pdfUrl, pdfPath, thumbnailPath
    })
    return { pdfPath, thumbnailPath };
  }

  getPdfList(): { pdfUrl: string; pdfPath: string; thumbnailPath: string }[] {
    return this.pdfList;
  }
}
