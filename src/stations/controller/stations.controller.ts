import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrUpdateStationDto } from '../model/dto/create-update-station.dto';
import { GetStationsFilterDto } from '../model/dto/get-station-filter.dto';
import { Station } from '../model/station.interface';
import { StationsService } from '../service/stations.service';

@ApiTags('stations')
@Controller('stations')
export class StationsController {
  private logger = new Logger('StationsController');
  constructor(private stationsService: StationsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getStations(@Query() filterDto: GetStationsFilterDto): Promise<Station[]> {
    return this.stationsService.getStations(filterDto);
  }

  @Get('start-charge-point/:cpId')
  @UsePipes(ValidationPipe)
  commandChargePointById(
    @Query('command') command,
    @Param('cpId') cpId: string
  ): void {
    this.stationsService.commandChargePointById(cpId, command || '');
  }

  @Get('/:id')
  getStationById(@Param('id', ParseIntPipe) id: number): Promise<Station> {
    return this.stationsService.getStationById(id);
  }
  @Post()
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  createStation(
    @Body() createStationDto: CreateOrUpdateStationDto
  ): Promise<Station> {
    this.logger.log(
      `Creating new station. Data: ${JSON.stringify(createStationDto)}`
    );
    return this.stationsService.create(createStationDto);
  }
}
