import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { SummaryScore } from './schemas/summaryScore.schema';
import { SummaryScoreDto, UserDto } from './dto/user.dto';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';
import { Device, DeviceDocument } from 'src/devices/schemas/device.schema';
import {
  Configuration,
  ConfigurationDecument,
} from 'src/devices/schemas/configuration.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Configuration.name)
    private readonly configurationModel: Model<ConfigurationDecument>,
    @InjectModel(Device.name)
    private readonly deviceModel: Model<DeviceDocument>,
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

    return newUser.save();
  }

  async updateUser(userId: string, userRequest: UserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      userRequest,
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
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
      .find({}, { password: 0 })
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
      image: `${process.env.BASE_URL}/${userId}-profile.png`,
    });
    return image;
  }

  async deleteUserById(userId: string) {
    const user = await this.userModel
      .findByIdAndDelete(userId, { password: 0 })
      .populate('devices');
    if (!user) throw new NotFoundException(`User not found`);

    const deviceIds = user.devices.map((device) => device._id);

    const configurationIds = user.devices.map(
      (device) => device.configurations,
    );

    await this.summaryScoreModel.deleteOne({ _id: user.summaryScore });
    await this.deviceModel.deleteMany({ _id: { $in: deviceIds } });
    await this.configurationModel.deleteMany({
      _id: { $in: configurationIds },
    });
    return user;
  }
}
