import { Request } from "express"

export class AssetCreateRequest {
    private data: any[] = [];
    private userId: number;
    constructor(req: Request) {
        const body = req.body;
        this.userId = parseInt(req.params.id);
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
    getUserId(): number {return this.userId; }
}