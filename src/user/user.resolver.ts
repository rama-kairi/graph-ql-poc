import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentQuery } from '@/common/decorators/query.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { GetManyInput, GetOneInput } from '@/common/graphql/custom.input';
import { GraphqlPassportAuthGuard } from '@/common/guards/graphql-passport-auth.guard';
import GraphQLJSON from 'graphql-type-json';
import { GetUserType, User } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GetUserType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyUserList(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<User>,
    @CurrentQuery() gqlQuery: string,
  ) {
    return this.userService.getMany(qs, gqlQuery);
  }

  @Query(() => User)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneUser(
    @Args({ name: 'input' })
    qs: GetOneInput<User>,
    @CurrentQuery() gqlQuery: string,
  ) {
    return this.userService.getOne(qs, gqlQuery);
  }

  @Mutation(() => User)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput) {
    return this.userService.update(id, input);
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteUser(@Args('id') id: string) {
    return this.userService.delete(id);
  }

  @Query(() => User)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  getMe(@CurrentUser() user: User) {
    return this.userService.getOne({
      where: { id: user.id },
    });
  }
}
