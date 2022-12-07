import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StationEntity {
  @PrimaryGeneratedColumn()
  id?: number;
}
