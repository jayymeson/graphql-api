import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = crypto
  .createHash('sha256')
  .update(String(process.env.SECRET_KEY || 'B0hqbCVkfJmowae34wnuvwN8c1H4lOh3'))
  .digest('base64')
  .substr(0, 32);

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = (hash: { iv: string; content: string }) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex'),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};
