import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  nombre_usuario: string;

  @Field()
  contrasenia: string;

  @Field(() => Int, { nullable: true })
  id_personal: number | null;

  @Field(() => Int)
  id_rol: number;

  @Field(() => Int)
  usuario_creacion: number;
}
