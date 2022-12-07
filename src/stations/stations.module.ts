import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsService } from './service/stations.service';
import { StationsGateway } from './gateway/stations.gateway';
import { StationEntity } from './model/station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  providers: [StationsService, StationsGateway],
})
export class StationsModule {}
