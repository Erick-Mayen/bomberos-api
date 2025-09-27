import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VehicleMaintenanceService } from './maintenance.service';
import { VehicleMaintenance } from './dto/models/maintenance.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateVehicleMaintenanceInput } from './dto/inputs/create-maintenance.input';
import { UpdateVehicleMaintenanceInput } from './dto/inputs/update-maintenance.input';

@Resolver(() => VehicleMaintenance)
export class VehicleMaintenanceResolver {
  constructor(private readonly maintenanceService: VehicleMaintenanceService) {}

  @Query(() => [VehicleMaintenance])
  @UseGuards(GqlAuthGuard)
  findAllMaintenance() {
    return this.maintenanceService.findAll();
  }

  @Query(() => VehicleMaintenance)
  @UseGuards(GqlAuthGuard)
  findOneMaintenance(@Args('id', { type: () => Int }) id: number) {
    return this.maintenanceService.findOne(id);
  }

  @Mutation(() => VehicleMaintenance)
  @UseGuards(GqlAuthGuard)
  createMaintenance(
    @Args('createVehicleMaintenanceInput') createVehicleMaintenanceInput: CreateVehicleMaintenanceInput,
  ) {
    return this.maintenanceService.create(createVehicleMaintenanceInput);
  }

  @Mutation(() => VehicleMaintenance)
  @UseGuards(GqlAuthGuard)
  updateMaintenance(
    @Args('updateVehicleMaintenanceInput') updateVehicleMaintenanceInput: UpdateVehicleMaintenanceInput,
  ) {
    return this.maintenanceService.update(
      updateVehicleMaintenanceInput.id_mantenimiento,
      updateVehicleMaintenanceInput,
    );
  }

  @Mutation(() => VehicleMaintenance)
  @UseGuards(GqlAuthGuard)
  removeMaintenance(@Args('id', { type: () => Int }) id: number) {
    return this.maintenanceService.remove(id);
  }
}
