
import pdfRoutes from './routes/ pdfRoutes';
import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config/config';
import fs from 'fs';
import logger from './utils/logger';
import { globalLimiter } from './middlewares/rateLimiter';


if (!fs.existsSync(config.pdfStorageDir)) {
  fs.mkdirSync(config.pdfStorageDir, { recursive: true });
}

const app = express();
app.use(globalLimiter);
app.use(bodyParser.json());

app.use('/api', pdfRoutes);

const port = 3000;
app.listen(port, () => {
 logger.info(`Server is running at http://localhost:${port}`);
});

