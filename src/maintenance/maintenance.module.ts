import { Module } from '@nestjs/common';
import { VehicleMaintenanceService } from './maintenance.service';
import { VehicleMaintenanceResolver  } from './maintenance.resolver';

@Module({
  providers: [VehicleMaintenanceService, VehicleMaintenanceResolver],
})
export class MaintenanceModule {}
