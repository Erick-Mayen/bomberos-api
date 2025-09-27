import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateVehicleMaintenanceInput {
    @Field(() => Int)
    id_unidad: number;

    @Field(() => Date)
    fecha_mantenimiento: Date;

    @Field(() => String, { nullable: true })
    descripcion?: string;

    @Field(() => String, { nullable: true })
    taller?: string;

    @Field(() => Int, { nullable: true })
    kilometraje?: number;

    @Field(() => Float, { nullable: true })
    costo?: number;

    @Field(() => Int, { nullable: true })
    proximo_mantenimiento?: number;

    @Field(() => Int, { nullable: true })
    usuario_creacion?: number;
}
