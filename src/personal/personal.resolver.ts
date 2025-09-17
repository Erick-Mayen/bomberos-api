import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PersonalService } from './personal.service';
import { Personal } from './dto/models/personal.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreatePersonalInput } from './dto/inputs/create-personal.input';
import { UpdatePersonalInput } from './dto/inputs/update-personal.input';

@Resolver(() => Personal)
export class PersonalResolver {
    constructor(private readonly personalService: PersonalService) { }

    @Query(() => [Personal])
    @UseGuards(GqlAuthGuard)
    findAllPersonal() {
        return this.personalService.findAll();
    }

    @Query(() => Personal)
    @UseGuards(GqlAuthGuard)
    findOnePerson(@Args('id', { type: () => Int }) id: number) {
        return this.personalService.findOne(id);
    }

    @Mutation(() => Personal)
    @UseGuards(GqlAuthGuard)
    createPerson(@Args('CreatePersonalInput') createPersonalInput: CreatePersonalInput) {
        return this.personalService.create(createPersonalInput);
    }

    @Mutation(() => Personal)
    @UseGuards(GqlAuthGuard)
    updatePerson(@Args('updatePersonalInput') updatePersonalInput: UpdatePersonalInput) {
        return this.personalService.update(
            updatePersonalInput.id_personal,
            updatePersonalInput,
        );
    }

    @Mutation(() => Personal)
    @UseGuards(GqlAuthGuard)
    removePerson(@Args('id', { type: () => Int }) id: number) {
        return this.personalService.remove(id);
    }
}
