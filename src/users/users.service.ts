import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.usuario.findMany({
      include: { personalAsignado: true, rol: true },
    });
  }

  async findOne(id: number) {
  await this.validateUserExists(id);
  return this.prisma.usuario.findUnique({
    where: { id_usuario: id },
    include: { personalAsignado: true, rol: true },
  });
}

  async create(data: CreateUserInput) {
    await this.validateUsernameUnique(data.nombre_usuario);

    const hashedPassword = await bcrypt.hash(data.contrasenia, 10);

    return this.prisma.usuario.create({
      data: {
        ...data,
        contrasenia: hashedPassword,
        id_personal: data.id_personal,
        id_rol: data.id_rol,
      },
    });
  }

  async update(id: number, data: UpdateUserInput) {
    const user = await this.validateUserExists(id);

    if (data.nombre_usuario && data.nombre_usuario !== user.nombre_usuario) {
      await this.validateUsernameUnique(data.nombre_usuario, id);
    }

    const updatedData = { ...data };
    if (data.contrasenia) {
      updatedData.contrasenia = await bcrypt.hash(data.contrasenia, 10);
    }

    return this.prisma.usuario.update({
      where: { id_usuario: id },
      data: updatedData,
    });
  }

  async remove(id: number) {
    await this.validateUserExists(id);

    return this.prisma.usuario.update({
      where: { id_usuario: id },
      data: { activo: false },
    });
  }

  private async validateUserExists(id: number) {
  const user = await this.prisma.usuario.findUnique({ where: { id_usuario: id } });
  if (!user) {
    throw new NotFoundException(`Usuario con id ${id} no encontrado`);
  }
  return user;
}

  private async validateUsernameUnique(nombre_usuario: string, currentId?: number) {
    const existing = await this.prisma.usuario.findUnique({ where: { nombre_usuario } });
    if (existing && existing.id_usuario !== currentId) {
      throw new BadRequestException(`El nombre de usuario ya existe`);
    }
  }
}
