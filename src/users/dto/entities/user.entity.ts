import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Rol } from './rol.entity';
import { Personal } from './personal.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id_usuario: number;

  @Field()
  nombre_usuario: string;

  @Field()
  contrasenia: string;

  @Field(() => Int, { nullable: true })
  id_personal: number | null;

  @Field(() => Int)
  id_rol: number;

  @Field({ defaultValue: true })
  activo: boolean;

  @Field(() => Int, { nullable: true })
  usuario_creacion: number | null;

  @Field()
  fecha_creacion: Date;

  @Field() fecha_actualizacion: Date;

  @Field(() => Personal, { nullable: true })
  personalAsignado?: Personal | null;

  @Field(() => Rol)
  rol: Rol;
}
