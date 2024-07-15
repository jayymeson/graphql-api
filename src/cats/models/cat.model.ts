import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field()
  id: string;

  @Field(() => String)
  name: { iv: string; content: string };

  @Field(() => String)
  age: { iv: string; content: string };

  @Field(() => String)
  breed: { iv: string; content: string };
}
