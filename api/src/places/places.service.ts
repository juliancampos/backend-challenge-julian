import { HttpStatus, Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { AdapterResponse } from '../adapter/AdapterResponse';
import { PlacesRepository } from './places.repository';

@Injectable()
export class PlacesService {
  constructor(
    private countriesService: CountriesService,
    private adapterResponse: AdapterResponse,
    private placeRepository: PlacesRepository
  ) {}

  async findAll(local?: string) {
    return await this.placeRepository.findAllAndRelations(local);
  }

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<any> {
    const { local, meta, countryId } = createPlaceDto;
    const place = await this.placeRepository.create({ local, meta });
    const country = await this.countriesService.findOne(countryId);
    if (!country) {
      return this.adapterResponse.sendException('Country not found!', HttpStatus.BAD_REQUEST);
    }

    try {
      place.country = country;
      return await this.placeRepository.save(place);
    } catch (error) {
      if (error.code === '23505') {
        return this.adapterResponse.sendException(
          'O registro já se encontra cadastrado!',
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message
        );
      }
      return this.adapterResponse.sendException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    return await this.placeRepository.findOne(id);
  }

  async update(id: string, data: UpdatePlaceDto) {
    const place = await this.findOne(id);
    const { local, meta } = data;
    this.placeRepository.dataMerge(place, { local, meta });
    return await this.placeRepository.save(place);
  }

  async delete(id: string) {
    const result = await this.placeRepository.remove(id);
    if (!result.affected) {
      return this.adapterResponse.sendException('Place not found!', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
