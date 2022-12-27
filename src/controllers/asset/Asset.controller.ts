import { User, Asset } from "../../entities";
import { AssetCreateRequest, UserUpdateRequest, UserDeleteRequest } from '../../requests';
import { AppDataSource } from "../../data-source"

export class AssetController {

    static async create(request: AssetCreateRequest): Promise<boolean> {
        const userRepository = AppDataSource.getRepository(User);
        const assetRepository = AppDataSource.getRepository(Asset);
        const owner = await userRepository.findOneBy({
            id: request.getUserId(),
        });
        if (!owner) throw new Error('User does not exist');
        const data = request.getBody();
        const assets = data.map( element => {
            const asset = new Asset();
            asset.name = element.name;
            asset.description = element.description;
            asset.value = element.value;
            asset.owner = owner;
            return asset;
        })

        try {
            await assetRepository.save(assets);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getAssets(userId: number): Promise<Asset[]> { 
        const assetRepository = AppDataSource.getRepository(Asset);
        const userRepository = AppDataSource.getRepository(User);
        const userToUpdate = await userRepository.findOneBy({
            id: userId,
        });
        if (!userToUpdate) throw new Error('User does not exist');
        return await assetRepository.find({ where : { owner : { id : userId}}});
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