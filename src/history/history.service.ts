import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History, HistoryDocument } from './schemas/history.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TeamService } from 'src/team/team.service';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<History>,
    @InjectModel(User.name) private userModel: Model<User>,
    private teamService: TeamService,
  ) {}

  async createHistory(
    createHistoryDto: CreateHistoryDto,
  ): Promise<HistoryDocument> {
    const redTeam = await this.teamService.createTeam(createHistoryDto.redTeam);
    const blueTeam = await this.teamService.createTeam(
      createHistoryDto.blueTeam,
    );

    const history = new this.historyModel({ redTeam, blueTeam });
    return history.save();
  }

  async findHistoryById(userId: string) {
    const userPipeline = [
      {
        $lookup: {
          from: 'devices',
          localField: 'devices',
          foreignField: '_id',
          as: 'devices',
          pipeline: [
            {
              $lookup: {
                from: 'configulations',
                localField: 'configulations',
                foreignField: '_id',
                as: 'configulations',
              },
            },
            {
              $unwind: '$configulations',
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'summaryscores',
          localField: 'summaryScore',
          foreignField: '_id',
          as: 'summaryScore',
        },
      },
      {
        $unwind: '$summaryScore',
      },
      {
        $project: {
          password: 0,
        },
      },
    ];

    const teamPipeline = [
      {
        $lookup: {
          from: 'scores',
          localField: 'score',
          foreignField: '_id',
          as: 'score',
        },
      },
      {
        $unwind: '$score',
      },
    ];

    const history = await this.historyModel.aggregate([
      {
        $lookup: {
          from: 'teams',
          localField: 'redTeam',
          foreignField: '_id',
          as: 'redTeam',
          pipeline: teamPipeline,
        },
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'blueTeam',
          foreignField: '_id',
          as: 'blueTeam',
          pipeline: teamPipeline,
        },
      },
      {
        $unwind: '$redTeam',
      },
      {
        $unwind: '$blueTeam',
      },
      {
        $match: {
          $or: [
            {
              'redTeam.user': {
                $eq: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              'blueTeam.user': {
                $eq: new mongoose.Types.ObjectId(userId),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'redTeam.user',
          foreignField: '_id',
          as: 'redTeam.user',
          pipeline: userPipeline,
        },
      },
      {
        $unwind: '$redTeam.user',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'blueTeam.user',
          foreignField: '_id',
          as: 'blueTeam.user',
          pipeline: userPipeline,
        },
      },
      {
        $unwind: '$blueTeam.user',
      },
    ]);

    return history;
  }
}
