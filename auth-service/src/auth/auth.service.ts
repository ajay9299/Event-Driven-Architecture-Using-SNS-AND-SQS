import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SqsService } from 'src/sqs/sqs.service';
import { SnsService } from 'src/sns/sns.service';

@Injectable()
export class AuthService {

  constructor(private readonly prismaService: PrismaService, private readonly sqsService: SqsService, private readonly snsService: SnsService) {}

  async create(createAuthDto: CreateAuthDto) {
    const { confirmPassword, ...userData } = createAuthDto;
    await this.prismaService.user.create({
      data: {
        ...userData,
      },
    });
    // Send welcome email to user using sqs
    // await this.sqsService.sendMessage({
    //   to: createAuthDto.email,
    //   subject: 'Welcome to Our Service!',
    //   body: `Hello ${userData.firstName}, welcome to our service! We're glad to have you on board.`
    // });

    await this.snsService.pushNotification({
      to: createAuthDto.email,
      subject: 'Welcome to Our Service!',
      body: `Hello ${userData.firstName}, welcome to our service! We're glad to have you on board.`
    });

    return 'This action adds a new auth';
  }

  async findAll() {
    const user = await this.prismaService.user.findMany();
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
