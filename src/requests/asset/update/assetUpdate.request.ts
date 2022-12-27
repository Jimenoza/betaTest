import { Request } from "express"
import { CustomRequest } from "../../customRequest";

export class AssetUpdateRequest extends CustomRequest{
    private data: any;
    private assetId: number;
    constructor(req: Request) {
        super();
        const body = req.body;
        this.assetId = parseInt(req.params.idAsset);
        this.data = {
            newName: body.newName ? body.newName : '',
            newValue: body.newValue ? body.newValue : '',
            newDescription: body.newDescription ? body.newDescription : '',
        }
    }

    getBody(): any { return this.data; }
    getAssetId(): number { return this.assetId; }
}