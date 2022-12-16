import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsService } from './service/stations.service';
import { StationsController } from './controller/stations.controller';
import { StationEntity } from './model/station.entity';
import { StationRepository } from './repository/stations.repository';
import { StationGateway } from './gateway/station/station.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  controllers: [StationsController],
  providers: [StationsService, StationRepository, StationGateway],
})
export class StationsModule {}
