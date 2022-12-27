import { Request } from "express"

export class AssetDeleteRequest {
    private assetId: number;
    private userId: number;
    constructor(req: Request) {
        this.assetId = parseInt(req.params.idAsset);
        this.userId = parseInt(req.params.idUser);
    }
    getAssetId(): number { return this.assetId; }
    getUserId(): number { return this.userId; }
}