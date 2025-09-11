import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  nombre_usuario: string;

  @Field()
  contrasenia: string;
}
