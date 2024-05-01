export class ConfigurationDto {
  readonly lightColor: string;
  readonly mode: string;
}

export class DeviceDto {
  readonly name: string;
  readonly address: string;
  readonly configurations: ConfigurationDto;
}
