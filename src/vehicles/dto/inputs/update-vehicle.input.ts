import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateVehicleInput } from './create-vehicle.input';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {
    @Field(() => Int)
    id_unidad: number;

    @Field(() => Boolean, { nullable: true })
    activo: boolean;

    @Field(() => Int, { nullable: true })
    id_estado_unidad: number;
    
    @Field(() => Int, { nullable: true })
    kilometraje?: number;
}
