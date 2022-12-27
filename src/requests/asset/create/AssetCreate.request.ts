import { Request } from "express"
import { CustomRequest } from "../../customRequest";

export class AssetCreateRequest extends CustomRequest{
    private data: any[] = [];
    constructor(req: Request) {
        super();
        const body = req.body;
        body.forEach(element => {
            if (!element.name) throw new Error('No name provided');
            if (!element.value || body.value <= 0) throw new Error('No value provided or a negative value');
            if (!element.description) throw new Error('No value provided');
            this.data.push({
                name: element.name,
                value: element.value,
                description: element.description,
            });
        });
    }

    getBody(): any[] { return this.data }
}