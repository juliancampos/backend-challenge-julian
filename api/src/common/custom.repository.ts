export class CustomRepository {
  protected repository: any;
  constructor(repository) {
    this.repository = repository;
  }

  // constructor(protected entity: Function) {
  //   this.repository = getRepositoryToken(entity);
  //   console.log('tttttt ', this.repository.find)
  // }

  async create(data) {
    return await this.repository.create(data);
  }

  async save(data) {
    return this.repository.save(data);
  }

  async findOne(id: string) {
    return this.repository.findOne({ where: { id }});
  }

  async dataMerge(data, values) {
    return this.repository.merge(data, values);
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }
}
