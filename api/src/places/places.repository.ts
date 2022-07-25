import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "../common/custom.repository";
import { Repository } from "typeorm";
import { PlaceEntity } from "./place.entity";


export class PlacesRepository extends CustomRepository<PlaceEntity> {
  constructor(
    @InjectRepository(PlaceEntity)
    protected repository: Repository<PlaceEntity>
  ) {
    super(repository)
  }

  async findOneById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

 async findAllAndRelations (local: string) {

   return await this.repository.find({ where: { local }, relations: ['country'], order: { meta: 'asc' } });
 }
}
