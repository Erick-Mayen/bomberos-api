import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TipoPersonal {
  @Field(() => Int)
  id_tipo_personal: number;

  @Field()
  nombre: string;
}
