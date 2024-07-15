import { Injectable } from '@nestjs/common';
import { CreateCatInput } from './dto/create-cat.input';
import { encrypt } from '../crypto/crypto.util';

interface EncryptedCat {
  id: string;
  name: { iv: string; content: string };
  age: { iv: string; content: string };
  breed: { iv: string; content: string };
}

@Injectable()
export class CatsService {
  private cats: EncryptedCat[] = [];

  create(createCatInput: CreateCatInput): EncryptedCat {
    const encryptedCat: EncryptedCat = {
      id: Date.now().toString(),
      name: encrypt(createCatInput.name),
      age: encrypt(createCatInput.age.toString()),
      breed: encrypt(createCatInput.breed),
    };

    this.cats.push(encryptedCat);
    return encryptedCat;
  }

  findAll(): EncryptedCat[] {
    return this.cats;
  }
}
