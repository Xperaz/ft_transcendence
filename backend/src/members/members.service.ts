import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Members, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findOne(params: {
    userId: string;
    roomId: string;
  }): Promise<Members | null> {
    try {
      const { userId, roomId } = params;
      // console.log('++findOne||++>', id);
      const response = await this.prisma.members.findFirst({
        where: {
          userId,
          roomsId: roomId,
        },
      });
      if (!response) new NotFoundException();
      return response;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Members[]> {
    return this.prisma.members.findMany();
  }

  async findALLForRoom(roomId: string): Promise<Members[]> {
    // console.log('++findALLForRoom++>', roomId);

    return this.prisma.members.findMany({
      where: { RoomId: { id: roomId } },
    });
  }

  async create(data: {
    type: any | Prisma.EnumUserTypeFieldUpdateOperationsInput;
    user: string;
    roomId?: string;
    directMessageId?: string;
  }): Promise<Members> {
    // const user =
    try {
      const { type, user, roomId } = data;
      return await this.prisma.members.create({
        data: {
          type: type,
          user: {
            connect: { id: user },
          },
          RoomId: {
            connect: { id: roomId },
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "CAN'T CREATE THIS MESSAGE",
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async update(params: {
    id: string;
    type: Prisma.EnumUserTypeFieldUpdateOperationsInput;
  }): Promise<Members> {
    const { id, type } = params;
    // console.log('++update++>', id);

    return await this.prisma.members.update({
      data: { type },
      where: { id },
    });
  }

  async remove(id: string): Promise<Members> {
    // console.log('++remove++>', id);

    return await this.prisma.members.delete({
      where: { id },
    });
  }
}
