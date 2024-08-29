import { DeviceDto } from 'src/devices/dto/device.dto';

export class SummaryScoreDto {
  readonly killed: number;
  readonly death: number;
  readonly short: number;
  readonly winCount: number;
  readonly loseCount: number;
}

export class UserDto {
  readonly _id: string;
  readonly fname: string;
  readonly lname: string;
  readonly code: number;
  readonly username: string;
  readonly email: string;
  readonly birthdate: string;
  readonly image: string;
  readonly password: string;
  readonly devices: DeviceDto[];
  readonly summaryScore: SummaryScoreDto;
}
