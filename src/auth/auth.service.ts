import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response';
import { ChangePasswordInput } from './dto/change-password.input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validateUser(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.prisma.usuario.findUnique({
      where: { nombre_usuario: loginInput.nombre_usuario },
      include: {
        rol: true,
        personalAsignado: {
          include: {
            tipo_personal: true,
          },
        },
      },
    });

    if (!user) throw new UnauthorizedException('LOGIN_FALLIDO');

    if (!user.activo) throw new UnauthorizedException('USUARIO_INACTIVO');

    const valid = await bcrypt.compare(loginInput.contrasenia, user.contrasenia);
    if (!valid) throw new UnauthorizedException('LOGIN_FALLIDO');

    const payload = {
      sub: user.id_personal,
      usuario: user.nombre_usuario,
      rol: user.rol.nombre_rol,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }

  async changePassword(input: ChangePasswordInput): Promise<boolean> {
    const { id_usuario, actualPassword, newPassword } = input;

    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario },
    });

    if (!user) {
      throw new NotFoundException('USUARIO_NO_ENCONTRADO');
    }

    // Verificar contraseña actual
    const valid = await bcrypt.compare(actualPassword, user.contrasenia);
    if (!valid) {
      throw new UnauthorizedException('INVALID_PASSWORD');
    }

    // Generar hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar en BD
    await this.prisma.usuario.update({
      where: { id_usuario },
      data: {
        contrasenia: hashedPassword,
        validar: false
      },
    });

    return true;
  }
}
