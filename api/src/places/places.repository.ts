import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "../common/custom.repository";
import { Repository } from "typeorm";
import { PlaceEntity } from "./place.entity";


export class PlacesRepository extends CustomRepository {
  constructor(
    @InjectRepository(PlaceEntity)
    protected repository: Repository<PlaceEntity>
  ) {
    super(repository)
  }

  async findOneById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

 async findAllAndRelations () {
   return await this.repository.find({ relations: ['country'], order: { meta: 'asc' } });
 }
}
