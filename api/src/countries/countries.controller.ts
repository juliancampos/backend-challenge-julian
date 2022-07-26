import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from '../dto/create-country.dto';
import { ReturnCountryDto } from '../dto/return-country.dto';

@Controller('api/countries')
export class CountriesController {
  constructor(private countryService: CountriesService) {}

  @Post()
  async createCountry(@Body() createCountryDto: CreateCountryDto): Promise<ReturnCountryDto>{
    const country = await this.countryService.createCountry(createCountryDto);
    return {
      country,
      message: 'Country created!'
    }
  }

  @Get()
  async index(@Query() query?: { name: string }) {
    return await this.countryService.findAll(query?.name);
  }
}
