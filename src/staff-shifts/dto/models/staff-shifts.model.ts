import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StaffShifts {
  @Field(() => Int)
  id_turno: number;

  @Field()
  nombre_turno: string;

  @Field()
  tipo_turno: string;

  @Field()
  hora_inicio: string;

  @Field(() => [Int])
  dias_semana: number[];

  @Field(() => [Int])
  personal_asignado: number[];

  @Field()
  fecha_inicio_ciclo: Date;

  @Field({ nullable: true })
  fecha_fin_ciclo?: Date;

  @Field({ defaultValue: true })
  activo: boolean;

  @Field(() => String, { nullable: true })
  observaciones?: string;

  @Field({ defaultValue: false })
  es_rotativo: boolean;

  @Field(() => Int, { defaultValue: 0 })
  orden_rotacion: number;

  @Field(() => Int, { defaultValue: 1 })
  semanas_rotacion: number;

  @Field(() => Int, { nullable: true })
  usuario_creacion?: number;

  @Field()
  fecha_creacion: Date;

  @Field()
  fecha_actualizacion: Date;
}