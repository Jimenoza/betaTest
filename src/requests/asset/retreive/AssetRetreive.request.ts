import { Request } from "express"
import { CustomRequest } from "../../customRequest";

export class AssetRetreiveRequest extends CustomRequest {
    private data: any;
    constructor(req: Request) {
        super();
        const params = req.params;
        this.data = {
            userId: params.id
        }
    }

    getBody(): any { return this.data }
}