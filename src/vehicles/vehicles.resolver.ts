import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './dto/models/vehicle.model';
import { VehicleType } from './dto/models/vehicleType.model';
import { CreateVehicleInput } from './dto/inputs/create-vehicle.input';
import { UpdateVehicleInput } from './dto/inputs/update-vehicle.input';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle])
  @UseGuards(GqlAuthGuard)
  findAllVehicles() {
    return this.vehiclesService.findAll();
  }

  @Query(() => Vehicle)
  @UseGuards(GqlAuthGuard)
  findOneVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.findOne(id);
  }

  @Mutation(() => Vehicle)
  @UseGuards(GqlAuthGuard)
  createVehicle(@Args('createVehicleInput') createVehicleInput: CreateVehicleInput) {
    return this.vehiclesService.create(createVehicleInput);
  }

  @Mutation(() => Vehicle)
  @UseGuards(GqlAuthGuard)
  updateVehicle(@Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput) {
    return this.vehiclesService.update(
      updateVehicleInput.id_unidad,
      updateVehicleInput,
    );
  }

  @Mutation(() => Vehicle)
  @UseGuards(GqlAuthGuard)
  removeVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.remove(id);
  }

  @Query(() => [VehicleType])
  @UseGuards(GqlAuthGuard)
  findAllVehicleTypes() {
    return this.vehiclesService.findAllTypes();
  }
}
