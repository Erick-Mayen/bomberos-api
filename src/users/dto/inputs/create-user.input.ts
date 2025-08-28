import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  nombre_usuario: string;

  @Field()
  contrasenia: string;

  @Field()
  id_personal: number;

  @Field()
  id_rol: number;

  @Field()
  usuario_creacion: number;
}
