import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Vehicle } from 'src/vehicles/dto/models/vehicle.model';

@ObjectType()
export class VehicleMaintenance {
    @Field(() => Int)
    id_mantenimiento: number;

    @Field(() => Int)
    id_unidad: number;

    @Field(() => Date)
    fecha_mantenimiento: Date;

    @Field(() => String, { nullable: true })
    descripcion: string | null;

    @Field(() => String, { nullable: true })
    taller: string | null;

    @Field(() => Int, { nullable: true })
    kilometraje: number | null;

    @Field(() => Float, { nullable: true })
    costo: number | null;

    @Field(() => Int, { nullable: true })
    proximo_mantenimiento: number | null;

    @Field({ defaultValue: true })
    activo: boolean;

    @Field(() => Int, { nullable: true })
    usuario_creacion: number | null;

    @Field(() => Date)
    fecha_creacion: Date;

    @Field(() => Vehicle)
    Unidad: Vehicle;
}
