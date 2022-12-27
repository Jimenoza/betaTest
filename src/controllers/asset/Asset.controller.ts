import { User, Asset } from "../../entities";
import { AssetCreateRequest, AssetUpdateRequest, AssetDeleteRequest, AssetRetreiveRequest } from '../../requests';
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

    static async getAssets(request: AssetRetreiveRequest): Promise<Asset[]> { 
        const assetRepository = AppDataSource.getRepository(Asset);
        const userRepository = AppDataSource.getRepository(User);
        const userToUpdate = await userRepository.findOneBy({
            id: request.getUserId(),
        });
        if (!userToUpdate) throw new Error('User does not exist');
        return await assetRepository.find({ where : { owner : { id : request.getUserId()}}});
    }

    static async update(request: AssetUpdateRequest): Promise<Asset> {
        const data = request.getBody();
        const assetRepositry = AppDataSource.getRepository(Asset);
        const assets = await assetRepositry.find({ 
            where : { 
                owner : { 
                    id : request.getUserId()
                },
                id : request.getAssetId()
            }
        });
        if (assets.length === 0) throw new Error('Asset does not exist');
        const assetToUpdate = assets[0];
        if (data.newName) assetToUpdate.name = data.newName;
        if (data.newValue) assetToUpdate.value = data.newValue;
        if (data.newDescription) assetToUpdate.description = data.newDescription;
        const response = await assetRepositry.save(assetToUpdate);
        return response;
    }

    static async delete (request: AssetDeleteRequest) {
        const assetRepositry = AppDataSource.getRepository(Asset);
        const assets = await assetRepositry.find({ 
            where : { 
                owner : { 
                    id : request.getUserId()
                },
                id : request.getAssetId()
            }
        });
        if (assets.length === 0) throw new Error('Asset does not exist');
        const removedAsset = await assetRepositry.remove(assets);
        return removedAsset;
    }
}