import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateVehicleMaintenanceInput } from './create-maintenance.input';

@InputType()
export class UpdateVehicleMaintenanceInput extends PartialType(CreateVehicleMaintenanceInput) {
    @Field(() => Int)
    id_mantenimiento: number;

    @Field(() => Boolean, { nullable: true })
    activo: boolean;
}
