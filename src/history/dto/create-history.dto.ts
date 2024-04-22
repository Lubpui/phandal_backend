import { CreateTeamDto } from 'src/team/dto/create-team.dto';

export class CreateHistoryDto {
  readonly redTeam: CreateTeamDto;
  readonly blueTeam: CreateTeamDto;
}
