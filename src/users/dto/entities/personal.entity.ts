import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TipoPersonal } from './tipoPersonal.entity';

@ObjectType()
export class Personal {
  @Field(() => Int)
  id_personal: number;

  @Field()
  primer_nombre: string;

  @Field(() => String, { nullable: true })
  segundo_nombre: string | null;

  @Field()
  primer_apellido: string;

  @Field(() => String, { nullable: true })
  segundo_apellido: string | null;

  @Field()
  activo: boolean;

  @Field()
  fecha_creacion: Date;

  @Field()
  fecha_actualizacion: Date;

  @Field(() => Int)
  usuario_creacion: number;

  @Field(() => Int)
  id_tipo_personal: number;

  @Field(() => TipoPersonal)
  tipo_personal: TipoPersonal;
}
