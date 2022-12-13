import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identity: string;

  // @Column()
  // vendor: string = process.env.DEFAULT_VENDOR;

  // @Column()
  // model: string = process.env.DEFAULT_MODEL;

  @Column()
  centralSystemUrl: string;

  @Column()
  meterValue: number;

  @Column()
  chargeInProgress: boolean;

  @Column()
  currentTransactionId: number;

  @Column()
  currentChargingPower: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
