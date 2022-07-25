import { CountryEntity } from '../countries/country.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Place' })
@Unique('local_country_constraint', ['local', 'country'])
export class PlaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CountryEntity, country => country.places)
  country: CountryEntity;

  @Column({ nullable: false, type: 'varchar', length: 80 })
  local: string;

  
  @Column({ nullable: true, type: 'varchar', length: 7 })
  meta: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(place?: Partial<PlaceEntity>) {
    this.id = place?.id;
    this.country = place?.country;
    this.local = place?.local;
    this.meta = place?.meta;
    this.createdAt = place?.createdAt;
    this.updatedAt = place?.updatedAt;
  }
}