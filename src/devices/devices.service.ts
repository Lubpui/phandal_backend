import { HttpException, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './schemas/device.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Configulation } from './schemas/configulation.schema';
import { ConfigulationDto } from './dto/device.dto';
// import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Configulation.name)
    private configulationModel: Model<Configulation>,
  ) {}

  async createDevice({ userId, ...createDeviceDto }: CreateDeviceDto) {
    const findUser = await this.userModel.findById(userId);

    if (!findUser) throw new HttpException('User not found', 404);

    const newConfigulation = new this.configulationModel<ConfigulationDto>({
      lightColor: 'red',
      recoil: 1,
      mode: 'demi',
    });
    const saveConfigulation = await newConfigulation.save();

    const newDevice = new this.deviceModel({
      configulations: saveConfigulation.id,
      ...createDeviceDto,
    });
    const saveDevice = await newDevice.save();

    await findUser.updateOne({
      $push: {
        devices: saveDevice._id,
      },
    });

    return saveDevice;
  }

  // findAll() {
  //   return `This action returns all devices`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} device`;
  // }

  // update(id: number, updateDeviceDto: UpdateDeviceDto) {
  //   return `This action updates a #${id} device`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} device`;
  // }
}
