import { Injectable } from '@nestjs/common';
import { CreateCatInput } from './dto/create-cat.input';
import { Cat } from './models/cat.model';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(createCatInput: CreateCatInput): Cat {
    const cat: Cat = { id: Date.now().toString(), ...createCatInput };
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
