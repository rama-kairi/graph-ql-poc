import { CustomRepository } from '@/common/decorators/typeorm.decorator';
import { ExtendedRepository } from '@/common/graphql/customExtended';
import { Place } from './entities/place.entity';

@CustomRepository(Place)
export class PlaceRepository extends ExtendedRepository<Place> {}
