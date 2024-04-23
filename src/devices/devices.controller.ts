import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ConfigurationDto } from './dto/device.dto';

@Controller('device')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.createDevice(createDeviceDto);
  }

  @Patch('/configuration/update/:id')
  update(
    @Param('id') id: string,
    @Body() deviceConfiguration: ConfigurationDto,
  ) {
    return this.devicesService.updateDeviceConfiguration(
      id,
      deviceConfiguration,
    );
  }
}
