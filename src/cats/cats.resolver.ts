import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';
import { CreateCatInput } from './dto/create-cat.input';
import { decrypt } from '../crypto/crypto.util';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat], { name: 'cats' })
  findAll() {
    return this.catsService.findAll().map((cat) => ({
      id: cat.id,
      name: decrypt(cat.name),
      age: parseInt(decrypt(cat.age)),
      breed: decrypt(cat.breed),
    }));
  }

  @Mutation(() => Cat)
  createCat(@Args('createCatInput') createCatInput: CreateCatInput) {
    const encryptedCat = this.catsService.create(createCatInput);
    return {
      id: encryptedCat.id,
      name: decrypt(encryptedCat.name),
      age: parseInt(decrypt(encryptedCat.age)),
      breed: decrypt(encryptedCat.breed),
    };
  }
}
