import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType() export class Rol {
    @Field(() => Int)
    id_rol: number;

    @Field()
    nombre_rol: string;

}