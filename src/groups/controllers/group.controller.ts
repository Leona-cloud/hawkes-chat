import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { Group } from '../schemas/group.schema';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async createGroup(@Body() groupDate: Partial<Group>) {
    return await this.groupService.createGroup(groupDate);
  }

  @Patch(':group_id/add-member/:user_id')
  async addMember(
    @Param('group_id') group_id: string,
    @Param('user_id') user_id: string,
  ) {
    return await this.groupService.addMember(group_id, user_id);
  }

  @Get('user/:user_id')
  async fetchGroupsForUser(@Param('user_id') user_id: string) {
    return await this.groupService.getGroupsForUser(user_id);
  }
}
