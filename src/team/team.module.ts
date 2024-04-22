import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './schemas/team.schema';
import { Score, ScoreSchema } from './schemas/score.schema';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema,
      },
      {
        name: Score.name,
        schema: ScoreSchema,
      },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
