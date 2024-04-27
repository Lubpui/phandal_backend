import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { SummaryScore } from './schemas/summaryScore.schema';
import { SummaryScoreDto } from './dto/user.dto';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(SummaryScore.name)
    private readonly summaryScoreModel: Model<SummaryScore>,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<User> {
    // const { method, url, statusCode, statusMessage } = this.request;
    const newSummaryScore = new this.summaryScoreModel<SummaryScoreDto>({
      killed: 0,
      death: 0,
      short: 0,
      winCount: 0,
      loseCount: 0,
    });
    const saveSummaryScore = await newSummaryScore.save();

    const newUser = new this.userModel({
      summaryScore: saveSummaryScore.id,
      image: '',
      ...registerDto,
    });

    // this.logger.log(`${method} ${url} ${statusCode} ${statusMessage}`);

    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findUserByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username }).exec();
  }

  async findUserById(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(id, { password: 0 })
      .populate({
        path: 'devices',
        populate: { path: 'configurations' },
      })
      .populate('summaryScore');
    return user;
  }

  async findAllUsers(): Promise<UserDocument[]> {
    const users = await this.userModel
      .find()
      .populate({
        path: 'devices',
        populate: { path: 'configurations' },
      })
      .populate('summaryScore');
    return users;
  }

  async updateUserSummaryScore(userId: string, history: CreateHistoryDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);

    const summaryScore = await this.summaryScoreModel.findById(
      user.summaryScore,
    );
    if (!summaryScore) throw new HttpException('summaryScore not found', 404);

    const team =
      (history.redTeam.userId === userId && history.redTeam) ||
      (history.blueTeam.userId === userId && history.blueTeam);

    const { score, competitionResult } = team;
    const { killed, death, short } = score;

    const newSummaryScore: SummaryScoreDto = {
      killed: summaryScore.killed + killed,
      death: summaryScore.death + death,
      short: summaryScore.short + short,
      winCount:
        competitionResult === 'win'
          ? summaryScore.winCount + 1
          : summaryScore.winCount,
      loseCount:
        competitionResult === 'lose'
          ? summaryScore.winCount + 1
          : summaryScore.winCount,
    };

    const updateSummaryScore = await summaryScore.updateOne(newSummaryScore);

    return updateSummaryScore;
  }

  async updateUserProfile(userId: string, image: Express.Multer.File) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException(`User not found`, 404);

    await user.updateOne({
      image: `${process.env.BASE_URL}/profile.png`,
    });
    return image;
  }
}
