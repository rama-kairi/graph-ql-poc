import { CustomRepository } from '@/common/decorators/typeorm.decorator';
import { ExtendedRepository } from '@/common/graphql/customExtended';
import { User } from './entities/user.entity';

@CustomRepository(User)
export class UserRepository extends ExtendedRepository<User> {}
