import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCatInput } from './dto/create-cat.input';
import { Cat } from './models/cat.model';
import { encrypt, decrypt } from '../crypto/crypto.util';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async create(createCatInput: CreateCatInput): Promise<Cat> {
    const encryptedName = encrypt(createCatInput.name);
    const encryptedBreed = encrypt(createCatInput.breed);

    return this.prisma.cat.create({
      data: {
        name: encryptedName.content,
        age: createCatInput.age,
        breed: encryptedBreed.content,
        name_iv: encryptedName.iv,
        breed_iv: encryptedBreed.iv,
      },
    });
  }

  async findAll(): Promise<Cat[]> {
    const cats = await this.prisma.cat.findMany();
    return cats.map((cat) => ({
      ...cat,
      name: decrypt({ iv: cat.name_iv, content: cat.name }),
      breed: decrypt({ iv: cat.breed_iv, content: cat.breed }),
    }));
  }
}
