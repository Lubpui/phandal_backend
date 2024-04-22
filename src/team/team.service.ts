import { HttpException, Injectable } from '@nestjs/common';
import { CreateTeamDto, ScoreDto } from './dto/create-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schemas/team.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Score } from './schemas/score.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Score.name) private scoreModel: Model<Score>,
  ) {}

  async createTeam({ userId, score, ...createTeamDto }: CreateTeamDto) {
    const findUser = await this.userModel.findById(userId);

    if (!findUser) throw new HttpException('User not found', 404);

    const newScore = new this.scoreModel<ScoreDto>(score);
    const saveScore = await newScore.save();

    const newTeam = new this.teamModel({
      user: findUser.id,
      score: saveScore.id,
      ...createTeamDto,
    });
    return newTeam.save();
  }
}
