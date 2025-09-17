import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/dto/models/user.model';

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
