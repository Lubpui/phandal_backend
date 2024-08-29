import { SummaryScoreDto } from './user.dto';

export class RegisterDto {
  readonly username: string;
  readonly email: string;
  readonly birthdate: string;
  readonly password: string;
  readonly fname: string;
  readonly lname: string;
  readonly code: number;
  readonly summaryScore: SummaryScoreDto;
}
