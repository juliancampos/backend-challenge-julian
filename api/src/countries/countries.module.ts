import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountryEntity } from './country.entity';
import { AdapterResponse } from 'src/adapter/AdapterResponse';
import { CustomRepository } from '../common/custom.repository';
import { CountriesRepository } from './countries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountriesService, AdapterResponse, CountriesRepository],
  exports: [CountriesService],
  controllers: [CountriesController]
})
export class CountriesModule {}
