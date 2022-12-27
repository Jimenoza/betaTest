import { User } from "../entities/User";
import { UserCreateRequest, UserUpdateRequest, UserDeleteRequest } from '../requests';
import { AppDataSource } from "../data-source"
import { Error } from "../responses/error";

export class UserController {

    static async create(request: UserCreateRequest): Promise<User | Error> {
            const data = request.getBody();
            const user = new User();
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.password = data.password;
    
            const userRepository = AppDataSource.getRepository(User);
            try {
                return await userRepository.save(user);
            } catch (err) {
                throw new Error('Email exists');
            }
    }

    static async getUsers(): Promise<User[]> {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
    }

    static async update(request: UserUpdateRequest): Promise<User> {
        const data = request.getBody();
        const userRepository = AppDataSource.getRepository(User)
        const userToUpdate = await userRepository.findOneBy({
            email: data.email,
        });
        if (!userToUpdate) throw new Error('User does not exist');
        if (data.newFirstName) userToUpdate.firstName = data.newFirstName;
        if (data.newLastName) userToUpdate.lastName = data.newLastName;
        if (data.newEmail) userToUpdate.email = data.newEmail;
        if (data.newPassword) userToUpdate.password = data.newPassword;
        const response = await userRepository.save(userToUpdate);
        return response;
    }

    static async delete (request: UserDeleteRequest) {
        const userRepository = AppDataSource.getRepository(User);
        const data = request.getBody();
        const userToRemove = await userRepository.findOneBy({
            email: data.email,
        });
        if (!userToRemove) throw new Error('User does not exist');
        const removedUser = await userRepository.remove(userToRemove);
        return removedUser;
    }
}