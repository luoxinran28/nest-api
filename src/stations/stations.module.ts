import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsService } from './service/stations.service';
import { StationsController } from './controller/stations.controller';
import { StationEntity } from './model/station.entity';
import { StationRepository } from './repository/stations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  controllers: [StationsController],
  providers: [StationsService, StationRepository],
})
export class StationsModule {}
