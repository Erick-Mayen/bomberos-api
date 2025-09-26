import { ObjectType, Field, Int } from '@nestjs/graphql';
import { VehicleType } from './vehicleType.model';
import { VehicleState } from './vehicleState.model';

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

  @Field(() => Int)
  id_estado_unidad: number;

  @Field(() => VehicleState)
  estado_unidad: VehicleState;

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
