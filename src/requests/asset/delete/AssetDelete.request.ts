import { Request } from "express"
import { CustomRequest } from "../../customRequest";

export class AssetDeleteRequest extends CustomRequest {
    private assetId: number;
    constructor(req: Request) {
        super();
        this.assetId = parseInt(req.params.idAsset);
    }
    getAssetId(): number { return this.assetId; }
}