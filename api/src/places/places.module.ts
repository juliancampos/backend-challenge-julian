import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { PlaceEntity } from './place.entity';
import { CountriesModule } from '../countries/countries.module';
import { AdapterResponse } from 'src/adapter/AdapterResponse';
import { PlacesRepository } from './places.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity]), CountriesModule],
  controllers: [PlacesController],
  providers: [PlacesService, AdapterResponse, PlacesRepository],
  exports: [PlacesService]
})
export class PlacesModule {}
