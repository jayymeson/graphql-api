import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cat } from './models/cat.model';
import { CreateCatInput } from './dto/create-cat.input';
import { encrypt, decrypt } from '../crypto/crypto.util';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Cat[]> {
    const cats = await this.prisma.cat.findMany();
    const decryptedCats = cats.map((cat) => ({
      ...cat,
      name: decrypt({ iv: cat.name_iv, content: cat.name }),
    }));

    console.log('Retrieved and decrypted cats:', decryptedCats);

    return decryptedCats;
  }

  async create(createCatInput: CreateCatInput): Promise<Cat> {
    const encryptedName = encrypt(createCatInput.name);
    const newCat = await this.prisma.cat.create({
      data: {
        name: encryptedName.content,
        name_iv: encryptedName.iv,
        age: createCatInput.age,
        breed: createCatInput.breed,
      },
    });

    const decryptedCat = {
      ...newCat,
      name: decrypt({ iv: newCat.name_iv, content: newCat.name }),
    };

    console.log('Created and decrypted new cat:', decryptedCat);

    return decryptedCat;
  }
}
