import { Repository } from "typeorm";

export class CustomRepository<T> {
  protected repository: any;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(data: Partial<T>) {
    return await this.repository.create(data);
  }

  async save(data: Partial<T>) {
    return this.repository.save(data);
  }

  async findOne(id: string) {
    return this.repository.findOne({ where: { id }});
  }

  async dataMerge(data: Partial<T>, values: Partial<T>) {
    return this.repository.merge(data, values);
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }
}
