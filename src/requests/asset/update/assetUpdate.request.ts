import { Request } from "express"

export class AssetUpdateRequest {
    private data: any;
    private assetId: number;
    constructor(req: Request) {
        const body = req.body;
        this.assetId = parseInt(req.params.id);
        this.data = {
            newName: body.newName ? body.newName : '',
            newValue: body.newValue ? body.newValue : '',
            newDescription: body.newDescription ? body.newDescription : '',
        }
    }

    getBody(): any { return this.data; }
    getAssetId(): number { return this.assetId; }
}