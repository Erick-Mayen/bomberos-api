import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {
  @Field()
  unidad: string;

  @Field()
  modelo: string;

  @Field(() => Int)
  id_tipo_vehiculo: number;

  @Field(() => Int)
  id_estado_unidad: number;

  @Field({ nullable: true })
  descripcion?: string;

  @Field(() => Int, { nullable: true })
  kilometraje?: number;

  @Field(() => Int)
  usuario_creacion: number;
}
