import { Test, TestingModule } from '@nestjs/testing';
import { AdapterResponse } from '../adapter/AdapterResponse';
import { PlaceEntity } from './place.entity';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

const countryList: PlaceEntity[] = [
  new PlaceEntity({ id: '1', meta: '08/2022' }),
  new PlaceEntity({ id: '2', meta: '09/2022' })
];

const expectedPlace = {
  id: '1',
  meta: '08/2022'
};

const data = { meta: '02/2023', countryId: '987654' };
const expectedUpdatedPlace = {
  place: { ...data, ...expectedPlace },
  message: 'Place updated!'
};

describe('PlacesController', () => {
  let controller: PlacesController;
  let service: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [
        {
          provide: PlacesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(countryList),
            createPlace: jest.fn().mockResolvedValue(expectedPlace),
            findOne: jest.fn(),
            update: jest.fn().mockResolvedValue({ ...data, ...expectedPlace })
          }
        },
        {
          provide: AdapterResponse,
          useValue: {}
        }
      ]
    }).compile();
    controller = module.get<PlacesController>(PlacesController);
    service = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all places', async () => {
    const result = await controller.index();
    expect(result).toEqual(countryList);
    expect(typeof result).toEqual('object');
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return created place', async () => {
    const newPlace = {
      countryId: '134679',
      local: 'Muralha da China',
      meta: '09/2022'
    };
    const expectedCreatedPlace = {
      place: expectedPlace,
      message: 'Place created!'
    }
    const result = await controller.create(newPlace);
    expect(result).toEqual(expectedCreatedPlace);
    expect(typeof result).toEqual('object');
  });

  it('should update place', async () => {
    const id = '123';
    const result = await controller.update(id, data);
    expect(result).toEqual(expectedUpdatedPlace);
    expect(typeof result).toEqual('object');
  });
});
