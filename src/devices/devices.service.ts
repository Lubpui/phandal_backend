import { HttpException, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './schemas/device.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Configuration } from './schemas/configuration.schema';
import { ConfigurationDto } from './dto/device.dto';
import { DeleteDeviceDto } from './dto/delete-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Configuration.name)
    private configurationModel: Model<Configuration>,
  ) {}

  async createDevice({ userId, ...createDeviceDto }: CreateDeviceDto) {
    const findUser = await this.userModel.findById(userId);

    if (!findUser) throw new HttpException('User not found', 404);

    const newConfiguration = new this.configurationModel<ConfigurationDto>({
      lightColor: 'red',
      mode: 'semi',
    });
    const saveConfiguration = await newConfiguration.save();

    const newDevice = new this.deviceModel({
      configurations: saveConfiguration.id,
      ...createDeviceDto,
    });
    const saveDevice = await newDevice.save();

    await findUser.updateOne({
      $push: {
        devices: saveDevice._id,
      },
    });

    return saveDevice.populate('configurations');
  }

  async updateDeviceConfiguration(
    deviceId: string,
    configuration: ConfigurationDto,
  ) {
    const device = await this.deviceModel.findById(deviceId);
    if (!device) throw new HttpException('Device not found', 404);

    console.log(device._id);
    const deviceConfiguration = await this.configurationModel.findById(
      device.configurations,
    );
    if (!deviceConfiguration)
      throw new HttpException('Device Configuration not found', 404);

    const updatedDeviceConfiguration =
      await deviceConfiguration.updateOne(configuration);

    return updatedDeviceConfiguration;
  }

  async deleteDevice(deleteDeviceDto: DeleteDeviceDto) {
    const user = await this.userModel.findById(deleteDeviceDto.userId);
    if (!user) throw new HttpException('User not found', 404);

    const deviceId = deleteDeviceDto.deviceId;

    const device = await this.deviceModel.findById(deviceId);
    if (!device) throw new HttpException('Device not found', 404);

    const deviceConfiguration = await this.configurationModel.findById(
      device.configurations,
    );
    if (!deviceConfiguration)
      throw new HttpException('Device Configuration not found', 404);

    const newUserDevice = user.devices.filter((item) => item != deviceId);
    const newUser = {
      _id: user.id,
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
      image: user.image,
      password: user.password,
      devices: newUserDevice,
      summaryScore: user.summaryScore,
    };

    const deleteDevice = await device.deleteOne();
    const deleteDeviceConfiguration = await deviceConfiguration.deleteOne();
    const deleteUserDevice = await user.updateOne(newUser);

    return { deleteDevice, deleteDeviceConfiguration, deleteUserDevice };
  }
}
