import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "../common/custom.repository";
import { Repository } from "typeorm";
import { CountryEntity } from "./country.entity";


export class CountriesRepository extends CustomRepository {
  constructor(
    @InjectRepository(CountryEntity)
    protected repository: Repository<CountryEntity>
    ) {
      super(repository);
    }

  async createQuery(name: string) {
    return this.repository.createQueryBuilder()
      .where('lower(name) = lower(:name)', { name })
      .getOne();
  }

  async findAllAndRelations() {
    return this.repository.find({ relations:['places'], order: { name: 'ASC' } });
  }
}
