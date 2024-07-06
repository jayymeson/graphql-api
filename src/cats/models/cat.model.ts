import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  breed: string;
}
