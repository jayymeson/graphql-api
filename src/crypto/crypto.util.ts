import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY
  ? crypto
      .createHash('sha256')
      .update(String(process.env.SECRET_KEY))
      .digest('base64')
      .substr(0, 32)
  : 'B0hqbCVkfJmowae34wnuvwN8c1H4lOh3';

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  const result = {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
  console.log('Encrypted data:', result);
  return result;
}

export function decrypt(hash: { iv: string; content: string }) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex'),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);
  console.log('Decrypted data:', decrypted.toString());
  return decrypted.toString();
}

console.log('Server is running on https://localhost:3000');
