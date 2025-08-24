import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from '../common/dtos/auth/login.input';
import { AuthResponse } from '../common/dtos/auth/auth-response';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginInput.email },
    });

    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const valid = await bcrypt.compare(loginInput.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }
}