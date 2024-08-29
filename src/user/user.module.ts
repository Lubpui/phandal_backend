import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import {
  SummaryScore,
  SummaryScoreSchema,
} from './schemas/summaryScore.schema';
import { Device, DeviceSchema } from 'src/devices/schemas/device.schema';
import {
  Configuration,
  ConfigurationSchema,
} from 'src/devices/schemas/configuration.schema';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: SummaryScore.name, schema: SummaryScoreSchema },
      { name: Device.name, schema: DeviceSchema },
      { name: Configuration.name, schema: ConfigurationSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
