import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { CountryEntity } from './country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdapterResponse } from '../adapter/AdapterResponse';
import { CountriesRepository } from './countries.repository';

const countryList: CountryEntity[] = [
  new CountryEntity({ id: '1', name: 'Brasil', urlFlag: 'flag', places: [] }),
  new CountryEntity({ id: '2', name: 'Argentina', urlFlag: 'flag', places: [] })
];

const createdCountry = new CountryEntity({ name: 'China'});

describe('CountriesService', () => {
  let service: CountriesService;
  const countryRepository = {
    createQueryBuilder: jest.fn().mockImplementation(() => ({
      where: () => ({
        getOne: () => {}
      })
    })),
    create: jest.fn().mockResolvedValue(createdCountry),
    save: jest.fn().mockResolvedValue(createdCountry),
    find: jest.fn().mockResolvedValue(countryList),
    findOne: jest.fn().mockResolvedValue(countryList[1])
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: AdapterResponse,
          useValue: {
            sendException: jest.fn().mockImplementation((data) => data)
          }
        },
        {
          provide: CountriesRepository,
          useValue: {
            findAllAndRelations: jest.fn().mockImplementation(() => countryList),
            findOne: jest.fn().mockImplementation(() => countryList[1]),
            createQuery: jest.fn().mockImplementation(() => {}),
            create: jest.fn().mockImplementation(() => createdCountry),
            save: jest.fn().mockImplementation(() => createdCountry),
          }
        }
      ]
    }).compile();
    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all countries', async () => {
    const result = await service.findAll();
    expect(result).toEqual(countryList);
    expect(typeof result).toEqual('object');
  });

  it('should return one country', async () => {
    const expectedCountry: CountryEntity = countryList[countryList.findIndex(item => item.id === '2')]; 
    const result = await service.findOne('2');
    expect(result).toEqual(expectedCountry);
    expect(typeof result).toEqual('object');
  });

  it('should create country', async () => {
    const result = await service.createCountry({ name: createdCountry.name });
    expect(result.name).toEqual(createdCountry.name);
    expect(typeof result).toEqual('object');
  });
});
