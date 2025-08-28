import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType() export class Personal {
    @Field(() => Int)
    id_personal: number;

    @Field()
    nombres: string;

    @Field()
    apellidos: string;
}