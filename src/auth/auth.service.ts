import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response';

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
        personal: true,
        rol: true,
      },
    });

    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const valid = await bcrypt.compare(loginInput.contrasenia, user.contrasenia);
    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: user.id_personal, usuario: user.nombre_usuario, rol: user.rol.nombre_rol };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }
}