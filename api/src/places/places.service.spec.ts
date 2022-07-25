import { Test, TestingModule } from '@nestjs/testing';
import { PlacesService } from './places.service';
import { PlaceEntity } from './place.entity';
import { CountriesService } from '../countries/countries.service';
import { AdapterResponse } from '../adapter/AdapterResponse';
import { PlacesRepository } from './places.repository';

const placesList: PlaceEntity[] = [
  new PlaceEntity({ id: '1', local: 'Cataratas', meta: '01/2023' }),
  new PlaceEntity({ id: '2', local: 'Everest', meta: '03/2023' })
];

const createdPlace = new PlaceEntity({ local: 'Paris', meta: '07/2023' });

describe('PlacesService', () => {
  let service: PlacesService;
  const placeRepository = {
    create: jest.fn().mockResolvedValue(createdPlace),
    save: jest.fn().mockResolvedValue(createdPlace),
    find: jest.fn().mockResolvedValue(placesList),
    findOne: jest.fn().mockResolvedValue(placesList[1])
  };

  const countriesServiceMock = {
    findAll: jest.fn(),
    createPlace: jest.fn(),
    findOne: jest.fn().mockResolvedValue({ name: 'Ukraine' }),
    update: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: CountriesService,
          useValue: countriesServiceMock
        },
        {
          provide: AdapterResponse,
          useValue: {}
        },
        {
          provide: PlacesRepository,
          useValue: {
            create: jest.fn().mockImplementation(() => createdPlace),
            findAllAndRelations: jest.fn().mockImplementation(() => placesList),
            findOne: jest.fn().mockImplementation(() => placesList[1]),
            save: jest.fn().mockImplementation(() => createdPlace)
          }
        }
      ]
    }).compile();
    service = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all places', async () => {
    const result = await service.findAll();
    expect(result).toEqual(placesList);
    expect(typeof result).toEqual('object');
  });

  it('should return one place', async () => {
    const expectedPlace: PlaceEntity = placesList[placesList.findIndex(item => item.id === '2')]; 
    const result = await service.findOne('2');
    expect(result).toEqual(expectedPlace);
    expect(typeof result).toEqual('object');
  });

  it('should create place', async () => {
    const result = await service.createPlace({ countryId: '123', ...createdPlace });
    expect(result.local).toEqual(createdPlace.local);
    expect(typeof result).toEqual('object');
  });
});
