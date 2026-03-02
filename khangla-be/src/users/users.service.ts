import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

export interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

@Injectable()
export class UsersService {
  private readonly users: RegisteredUser[] = [];

  register(registerUserDto: RegisterUserDto): RegisteredUser {
    const normalizedEmail = registerUserDto.email.toLowerCase().trim();

    const userAlreadyExists = this.users.some(
      (user) => user.email === normalizedEmail,
    );

    if (userAlreadyExists) {
      throw new ConflictException('Email is already registered');
    }

    const user: RegisteredUser = {
      id: crypto.randomUUID(),
      fullName: registerUserDto.fullName.trim(),
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    };

    this.users.push(user);

    return user;
  }
}