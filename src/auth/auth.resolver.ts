import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from '../common/dtos/auth/login.input';
import { AuthResponse } from '../common/dtos/auth/auth-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

   @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.validateUser(loginInput);
  }
}