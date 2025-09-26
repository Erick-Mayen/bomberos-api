import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class VehicleState {
  @Field(() => Int)
  id_estado: number;

  @Field()
  nombre: string;
}