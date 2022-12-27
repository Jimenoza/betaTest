import { Request } from "express"

export class AssetRetreiveRequest {
    private data: any;
    constructor(req: Request) {
        const params = req.params;
        this.data = {
            userId: params.id
        }
    }

    getBody(): any { return this.data }
    getUserId(): number {return parseInt(this.data.userId); }
}