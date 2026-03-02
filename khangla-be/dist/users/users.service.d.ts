import { RegisterUserDto } from './dto/register-user.dto';
export interface RegisteredUser {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
}
export declare class UsersService {
    private readonly users;
    register(registerUserDto: RegisterUserDto): RegisteredUser;
}
