import { User } from '@/user/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtWithUser {
  @Field(() => String)
  jwt: string;

  @Field(() => User)
  user: User;
}
