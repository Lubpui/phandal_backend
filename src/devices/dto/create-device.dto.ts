import { ConfigulationDto } from './device.dto';

export class CreateDeviceDto {
  readonly name: string;
  readonly address: string;
  readonly userId: string;
  readonly configulations: ConfigulationDto;
}
