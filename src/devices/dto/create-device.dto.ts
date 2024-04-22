export class ConfigulationDto {
  readonly lightColor: string;
  readonly recoil: number;
  readonly mode: string;
}

export class CreateDeviceDto {
  readonly name: string;
  readonly address: string;
  readonly userId: string;
  readonly configulations: ConfigulationDto;
}
