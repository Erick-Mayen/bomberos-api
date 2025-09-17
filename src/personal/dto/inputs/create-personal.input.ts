import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePersonalInput {
  @Field()
  primer_nombre: string;

  @Field({ nullable: true })
  segundo_nombre?: string;

  @Field()
  primer_apellido: string;

  @Field({ nullable: true })
  segundo_apellido?: string;

  @Field(() => Int)
  id_tipo_personal: number;

  @Field(() => Int)
  usuario_creacion: number;
}
