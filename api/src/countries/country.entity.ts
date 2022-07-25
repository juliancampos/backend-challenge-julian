import { PlaceEntity } from '../places/place.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Country' })
@Unique('country_name', ['name'])
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 80 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 80 })
  urlFlag: string;

  @OneToMany(() => PlaceEntity, place => place.country)
  places: PlaceEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(country?: Partial<CountryEntity>) {
    this.id = country?.id;
    this.name = country?.name;
    this.urlFlag = country?.urlFlag;
    this.createdAt = country?.createdAt;
    this.updatedAt = country?.updatedAt;
  }
}