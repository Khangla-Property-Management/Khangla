import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';
import type { RegisteredUser } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(registerUserDto: RegisterUserDto): RegisteredUser;
}
