import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleMaintenanceInput } from './dto/inputs/create-maintenance.input';
import { UpdateVehicleMaintenanceInput } from './dto/inputs/update-maintenance.input';

@Injectable()
export class VehicleMaintenanceService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.mantenimiento_unidad.findMany({
      include: { unidad: true },
      orderBy: { fecha_creacion: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.mantenimiento_unidad.findUnique({
      where: { id_mantenimiento: id },
      include: { unidad: true },
    });
  }

  async create(data: CreateVehicleMaintenanceInput) {
    return this.prisma.mantenimiento_unidad.create({
      data,
    });
  }

  async update(id: number, data: UpdateVehicleMaintenanceInput) {
    return this.prisma.mantenimiento_unidad.update({
      where: { id_mantenimiento: id },
      data,
    });
  }

  async remove(id: number) {

    return this.prisma.mantenimiento_unidad.update({
      where: { id_mantenimiento: id },
      data: { activo: false },
    });
  }
}
