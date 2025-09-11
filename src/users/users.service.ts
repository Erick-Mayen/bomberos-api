import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany({
      include: {
        personalAsignado: true,
        rol: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id_usuario: id },
      include: { personalAsignado: true, rol: true },
    });
  }

  async create(data: CreateUserInput) {
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
    const updatedData = { ...data };

    if (data.contrasenia) {
      updatedData.contrasenia = await bcrypt.hash(data.contrasenia, 10);
    }
    return console.log('update');

    // return this.prisma.usuario.update({
    //   where: { id_usuario: id },
    //   data: updatedData,
    // });
  }

  async remove(id: number) {
    return this.prisma.usuario.update({
      where: { id_usuario: id },
      data: { activo: false },
    });
  }
}
