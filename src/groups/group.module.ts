import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),

  ],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
