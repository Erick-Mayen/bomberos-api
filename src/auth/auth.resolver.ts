import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response';
import { ChangePasswordInput } from './dto/change-password.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.validateUser(loginInput);
  }

  @Mutation(() => Boolean)
  async changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ): Promise<boolean> {
    return this.authService.changePassword(changePasswordInput);
  }
}
