export class SummaryScoreDto {
  readonly killed: number;
  readonly death: number;
  readonly short: number;
  readonly winCount: number;
  readonly loseCount: number;
}

export class RegisterDto {
  readonly username: string;
  readonly email: string;
  readonly birthdate: string;
  readonly password: string;
  readonly summaryScore: SummaryScoreDto;
}
