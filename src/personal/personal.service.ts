import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePersonalInput } from './dto/inputs/create-personal.input';
import { UpdatePersonalInput } from './dto/inputs/update-personal.input';

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.personal.findMany({
      include: { tipo_personal: true },
    });
  }

  async findOne(id: number) {
    await this.validatePersonalExists(id);
    return this.prisma.personal.findUnique({
      where: { id_personal: id },
      include: { tipo_personal: true },
    });
  }

  async create(data: CreatePersonalInput) {
    return this.prisma.personal.create({
      data,
    });
  }

  async update(id: number, data: UpdatePersonalInput) {
    await this.validatePersonalExists(id);

    return this.prisma.personal.update({
      where: { id_personal: id },
      data,
    });
  }

  async remove(id: number) {
    await this.validatePersonalExists(id);

    return this.prisma.personal.update({
      where: { id_personal: id },
      data: { activo: false },
    });
  }

  async findAllTypes() {
    return this.prisma.tipo_personal.findMany();
  }

  private async validatePersonalExists(id: number) {
    const personal = await this.prisma.personal.findUnique({
      where: { id_personal: id },
    });
    if (!personal) {
      throw new NotFoundException(`Personal con id ${id} no encontrado`);
    }
    return personal;
  }
}
