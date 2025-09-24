import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field(() => Int)
  id_usuario: number;

  @Field()
  actualPassword: string;

  @Field()
  newPassword: string;
}