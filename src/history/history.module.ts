import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './schemas/history.schema';
import { TeamModule } from 'src/team/team.module';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: History.name,
        schema: HistorySchema,
      },
      { name: User.name, schema: UserSchema },
    ]),
    TeamModule,
    UserModule,
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
