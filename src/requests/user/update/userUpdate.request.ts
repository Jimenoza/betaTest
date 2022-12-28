import { Request } from "express"
import { CustomRequest } from "../../customRequest";

export class UserUpdateRequest extends CustomRequest {
    private data: any;
    constructor(req: Request) {
        super();
        const body = req.body;
        this.data = {
            newFirstName: body.newFirstName ? body.newFirstName : '',
            newLastName: body.newLastName ? body.newLastName : '',
            newEmail: body.newEmail ? body.newEmail : '',
            newPassword: body.newPassword ? body.newPassword : '',
        }
    }

    getBody(): any { return this.data }
}