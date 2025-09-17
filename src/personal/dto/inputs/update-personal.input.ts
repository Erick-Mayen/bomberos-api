import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePersonalInput } from './create-personal.input';

@InputType()
export class UpdatePersonalInput extends PartialType(CreatePersonalInput) {
    @Field(() => Int)
    id_personal: number;

    @Field(() => Boolean, { nullable: true })
    activo: boolean;
}
