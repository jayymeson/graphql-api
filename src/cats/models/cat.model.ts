import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}

@InputType()
export class CreateCatInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;
}
