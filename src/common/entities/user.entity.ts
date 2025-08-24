import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field()
  name?: string;

  @Field()
  lastname?: string;

  @Field( () => String, { nullable: true })
  profile_pic: string | null;  

  @Field( () => Boolean, { nullable: true })
  is_active: boolean | null;
}
