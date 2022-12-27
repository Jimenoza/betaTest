import { User } from "../entities/User";
import { UserCreateRequest } from '../requests/user/create/UserCreate.request';
import { AppDataSource } from "../data-source"

export class UserController {

    static async newUser(request: UserCreateRequest): Promise<void> {
            const data = request.getBody();
            const user = new User();
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.password = data.password;
    
            const userRepository = AppDataSource.getRepository(User);
    
            await userRepository.save(user).catch(err => console.error(err));
    }

    static async getUsers(): Promise<User[]> {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
    }

    
}