import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.input';
import { Cat } from './models/cat.model';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Mutation(() => Cat)
  async createCat(@Args('createCatInput') createCatInput: CreateCatInput) {
    return this.catsService.create(createCatInput);
  }

  @Query(() => [Cat])
  async cats() {
    return this.catsService.findAll();
  }
}
