import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '..', 'secrets', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'secrets', 'cert.pem')),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  await app.listen(3000, () => {
    console.log('Server is running on https://localhost:3000');
  });
}
bootstrap();
