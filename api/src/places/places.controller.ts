import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { ReturnPlaceDto } from '../dto/return-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { PlacesService } from './places.service';

@Controller('api/places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  async index() {
    return await this.placesService.findAll();
  } 

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto): Promise<ReturnPlaceDto> {
    const place = await this.placesService.createPlace(createPlaceDto);
    return {
      place,
      message: 'Place created!'
    }
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<any> {
    await this.placesService.delete(id);
    return {
      message: 'Deleted!'
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePlaceDto: UpdatePlaceDto
  ): Promise<any> {
    const place = await this.placesService.update(id, updatePlaceDto);
    return {
      place,
      message: 'Place updated!'
    }
  }
}
