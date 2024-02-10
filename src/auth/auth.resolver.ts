import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators/user.decorator';
import { SignInGuard } from '../common/guards/graphql-signin.guard';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtWithUser } from './entities/auth._entity';
import { SignInInput, SignUpInput } from './inputs/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => JwtWithUser)
  @UseGuards(SignInGuard)
  signIn(@Args('input') _: SignInInput, @CurrentUser() user: User) {
    return this.authService.signIn(user);
  }

  @Mutation(() => JwtWithUser, {
    description:
      'Before you start to sign up, you have to set private key and public key in .env',
  })
  signUp(@Args('input') input: SignUpInput) {
    return this.authService.signUp(input);
  }
}
