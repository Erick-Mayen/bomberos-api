import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleInput } from './dto/inputs/create-vehicle.input';
import { UpdateVehicleInput } from './dto/inputs/update-vehicle.input';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.unidad.findMany({
      include: { tipo_vehiculo: true }, 
    });
  }

  async findOne(id: number) {
    await this.validateVehicleExists(id);
    return this.prisma.unidad.findUnique({
      where: { id_unidad: id },
      include: { tipo_vehiculo: true },
    });
  }

  async create(data: CreateVehicleInput) {
    await this.validateUnidadUnique(data.unidad);

    return this.prisma.unidad.create({
      data,
    });
  }

  async update(id: number, data: UpdateVehicleInput) {
   await this.validateVehicleExists(id);

    return this.prisma.unidad.update({
      where: { id_unidad: id },
      data,
    });
  }

  async remove(id: number) {
    await this.validateVehicleExists(id);

    return this.prisma.unidad.update({
      where: { id_unidad: id },
      data: { activo: false },
    });
  }

   async findAllTypes() {
    return this.prisma.tipo_vehiculo.findMany();
  }


  private async validateVehicleExists(id: number) {
    const vehicle = await this.prisma.unidad.findUnique({ where: { id_unidad: id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehículo con id ${id} no encontrado`);
    }
    return vehicle;
  }

  private async validateUnidadUnique(unidad: string, currentId?: number) {
    const existing = await this.prisma.unidad.findUnique({ where: { unidad } });
    if (existing && existing.id_unidad !== currentId) {
      throw new BadRequestException(`La unidad ${unidad} ya existe`);
    }
  }
}
