import { Test, TestingModule } from '@nestjs/testing';
import { AdapterResponse } from '../adapter/AdapterResponse';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountryEntity } from './country.entity';

const countryList: CountryEntity[] = [
  { id: '1', name: 'Brasil', urlFlag: 'flag', places: [], createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'Argentina', urlFlag: 'flag', places: [], createdAt: new Date(), updatedAt: new Date() }
];

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: {
            createCountry: jest.fn(),
            findAll: jest.fn().mockResolvedValue(countryList),
            findOne: jest.fn(),
          }
        },
        {
          provide: AdapterResponse,
          useValue: {}
        }
      ]
    }).compile();
    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all countries', async () => {
    const result = await controller.index();
    expect(result).toEqual(countryList);
    expect(typeof result).toEqual('object');
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
});
