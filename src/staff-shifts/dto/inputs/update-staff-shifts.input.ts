import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStaffShiftsInput {
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
}