import { Module } from '@nestjs/common';
import { StaffShiftsService } from './staff-shifts.service';
import { StaffShiftsResolver } from './staff-shifts.resolver';

@Module({
  providers: [StaffShiftsService, StaffShiftsResolver]
})
export class StaffShiftsModule {}
