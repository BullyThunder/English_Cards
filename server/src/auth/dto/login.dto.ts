import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({
        allow_display_name: false,
        host_blacklist: ['spam.com']
    },
    {message: 'Incorrect email format'})
    email: string;
    @IsString()
    @MinLength(6, { message: 'Use 6 or more characters for your password' })
    password: string;
} 