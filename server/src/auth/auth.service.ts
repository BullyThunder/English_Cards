import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService ) {}

    async register(dto: RegisterDto){
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        })
        if(existingUser){
            throw new BadRequestException('Incorrect email format or user already exists');
            }  
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            name: dto.name,
            passwordHash: hashedPassword
            }
        })
        const {passwordHash, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }
    async login(dto: LoginDto){
        const findUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
                password: dto.password
            }
        })
        if(findUser){
            
        }
    }
}
