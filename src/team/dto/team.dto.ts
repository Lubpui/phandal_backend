import { UserDto } from 'src/user/dto/user.dto';

export class ScoreDto {
  readonly killed: number;
  readonly death: number;
  readonly short: number;
}
export class TeamDto {
  readonly user: UserDto;
  readonly score: ScoreDto;
  readonly team: string;
  readonly competitionResult: string;
}
