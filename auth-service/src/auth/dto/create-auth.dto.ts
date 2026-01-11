import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;

    @IsString()
    username: string;

    @IsString()
    number: string;

    @IsString()
    @MinLength(4)
    password: string;

    @IsString()
    confirmPassword: string;
}
