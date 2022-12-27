import { Request } from "express"
import { CustomRequest } from "../../customRequest";

export class AssetDeleteRequest extends CustomRequest {
    private assetId: number;
    private userId: number;
    constructor(req: Request) {
        super();
        this.assetId = parseInt(req.params.idAsset);
        this.userId = parseInt(req.params.idUser);
    }
    getAssetId(): number { return this.assetId; }
    getUserId(): number { return this.userId; }
}