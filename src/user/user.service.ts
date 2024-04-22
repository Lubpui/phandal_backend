import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto, SummaryScoreDto } from './dto/register.dto';
import { SummaryScore } from './schemas/summaryScore.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(SummaryScore.name)
    private readonly summaryScoreModel: Model<SummaryScore>,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<User> {
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
      ...registerDto,
    });

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
        populate: { path: 'configulations' },
      })
      .populate('summaryScore');
    return user;
  }

  async findAllUsers(): Promise<UserDocument[]> {
    const users = await this.userModel
      .find()
      .populate({
        path: 'devices',
        populate: { path: 'configulations' },
      })
      .populate('summaryScore');
    return users;
  }
}
