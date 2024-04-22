export class ScoreDto {
  readonly killed: number;
  readonly death: number;
  readonly short: number;
}
export class CreateTeamDto {
  readonly userId: string;
  readonly score: ScoreDto;
  readonly team: string;
  readonly competitionResult: string;
}
