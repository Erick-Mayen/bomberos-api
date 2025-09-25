import { ObjectType, Field, Int } from '@nestjs/graphql';
import { VehicleType } from './vehicleType.model';

@ObjectType()
export class Vehicle {
  @Field(() => Int)
  id_unidad: number;

  @Field()
  unidad: string;

  @Field()
  modelo: string;

  @Field(() => Int)
  id_tipo_vehiculo: number;

  @Field(() => VehicleType)
  tipo_vehiculo: VehicleType;

  @Field(() => String, { nullable: true })
  descripcion: string | null;

  @Field(() => Int, { nullable: true })
  kilometraje: number | null;

  @Field({ defaultValue: true })
  activo: boolean;

  @Field()
  fecha_creacion: Date;

  @Field()
  fecha_actualizacion: Date;

  @Field(() => Int, { nullable: true })
  usuario_creacion: number | null;
}
