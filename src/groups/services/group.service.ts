import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async createGroup(groupData: Partial<Group>): Promise<Group> {
    const newGroup = new this.groupModel(groupData);
    return await newGroup.save();
  }

  async addMember(group_id: string, user_id: string): Promise<Group | null> {
    return await this.groupModel
      .findByIdAndUpdate(
        group_id,
        { $addToSet: { members: user_id } },
        { new: true },
      )
      .populate('members', 'user_name phone_name')
      .exec();
  }

  async getGroupsForUser(user_id: string): Promise<Group[]> {
    return await this.groupModel
      .find({
        members: user_id,
      })
      .populate('created_by', 'user_name phone_number')
      .populate('members', 'user_name phone_number')
      .exec();
  }
}
