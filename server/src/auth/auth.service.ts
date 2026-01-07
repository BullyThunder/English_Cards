import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException(
        'Incorrect email format or user already exists',
      );
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash: hashedPassword,
      },
    });
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return userWithoutPassword;
  }
  async login(dto: LoginDto) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (findUser === null) {
      throw new UnauthorizedException('false data');
    }
    const truePassword = await bcrypt.compare(
      dto.password,
      findUser.passwordHash,
    );
    if (!truePassword) {
      throw new UnauthorizedException('Incorrect password');
    }
    const tokens = await this.issueToken(findUser.id);

    const finalUser = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
    };
    return {
      user: finalUser,
      ...tokens,
    };
  }
  private async issueToken(userId: string) {
    const data = { id: userId };
    return { access_token: await this.jwtService.signAsync(data) };
  }
}
