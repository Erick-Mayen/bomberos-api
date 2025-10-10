import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { StaffShiftsService } from './staff-shifts.service';

import { StaffShiftsInput } from './dto/inputs/create-staff-shifts.input';
import { UpdateStaffShiftsInput } from './dto/inputs/update-staff-shifts.input';
import { StaffShifts } from './dto/models/staff-shifts.model';

@Resolver(() => StaffShifts)
export class StaffShiftsResolver {
    constructor(private readonly staffShiftsService: StaffShiftsService) { }

    @Query(() => [StaffShifts])
    @UseGuards(GqlAuthGuard)
    findAllShifts() {
        return this.staffShiftsService.findAll();
    }

    @Query(() => StaffShifts)
    @UseGuards(GqlAuthGuard)
    findOneShift(@Args('id', { type: () => Int }) id: number) {
        return this.staffShiftsService.findOne(id);
    }

    @Mutation(() => StaffShifts)
    @UseGuards(GqlAuthGuard)
    createShift(
        @Args('createStaffShiftsInput') createStaffShiftsInput: StaffShiftsInput,
    ) {
        return this.staffShiftsService.create(createStaffShiftsInput);
    }

    @Mutation(() => StaffShifts)
    @UseGuards(GqlAuthGuard)
    updateShift(
        @Args('updateStaffShiftsInput') updateStaffShiftsInput: UpdateStaffShiftsInput,
    ) {
        return this.staffShiftsService.update(
            updateStaffShiftsInput.id_turno,
            updateStaffShiftsInput,
        );
    }

    @Mutation(() => StaffShifts)
    @UseGuards(GqlAuthGuard)
    removeShift(@Args('id', { type: () => Int }) id: number) {
        return this.staffShiftsService.remove(id);
    }
}
