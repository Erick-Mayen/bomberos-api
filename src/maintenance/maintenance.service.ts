import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleMaintenanceInput } from './dto/inputs/create-maintenance.input';
import { UpdateVehicleMaintenanceInput } from './dto/inputs/update-maintenance.input';

@Injectable()
export class VehicleMaintenanceService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.mantenimiento_unidad.findMany({
      include: {
        unidad: {
          include: {
            tipo_vehiculo: true
          }
        }
      },
      orderBy: { fecha_mantenimiento: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.mantenimiento_unidad.findUnique({
      where: { id_mantenimiento: id },
      include: {
        unidad: {
          include: {
            tipo_vehiculo: true
          }
        }
      },
    });
  }

  async findByVehicleId(id_unidad: number) {
    return this.prisma.mantenimiento_unidad.findMany({
      where: {
        id_unidad,
        activo: true
      },
      include: {
        unidad: {
          include: {
            tipo_vehiculo: true
          }
        }
      },
      orderBy: { fecha_mantenimiento: 'desc' },
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
