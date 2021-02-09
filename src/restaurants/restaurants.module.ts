import { Category } from './entities/category.entity';
import { RestaurantService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolver';
import { Restaurant } from './entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category])],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
