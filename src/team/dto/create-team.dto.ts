import { ScoreDto } from './team.dto';

export class CreateTeamDto {
  readonly userId: string;
  readonly score: ScoreDto;
  readonly team: string;
  readonly competitionResult: string;
}
