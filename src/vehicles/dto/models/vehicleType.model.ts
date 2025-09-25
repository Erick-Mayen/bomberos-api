import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class VehicleType {
  @Field(() => Int)
  id_tipo_vehiculo: number;

  @Field()
  nombre: string;
}