import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from '../dto/create-country.dto';
import { AdapterResponse } from '../adapter/AdapterResponse';
import { CountriesRepository } from './countries.repository';


@Injectable()
export class CountriesService {
  constructor(
    private adapterResponse: AdapterResponse,
    private countryRepository: CountriesRepository
  ) {}

  async createCountry(createCountryDto: CreateCountryDto): Promise<any> {
    try {
      const countryFound = await this.countryRepository.createQuery(createCountryDto.name);
      if (countryFound) {
        throw Error('País já está cadastrado!');
      }
      const country = await this.countryRepository.create(createCountryDto);
      return await this.countryRepository.save(country);
    } catch(error) {
      return this.adapterResponse.sendException(error.message);
    }
  }

  async findAll(name?: string) {
    return await this.countryRepository.findAllAndRelations(name);
  }

  async findOne(id: string) {
    try {
      return await this.countryRepository.findOne(id)
    } catch (error) {
      throw new NotFoundException(error.mesage);      
    }
  }
}
