import * as express from "express"
import { Request, Response } from "express"
import { UserController, AssetController } from "./controllers";
import { UserCreateRequest,
    UserUpdateRequest,
    UserDeleteRequest,
    AssetRetreiveRequest,
    AssetCreateRequest,
    AssetUpdateRequest
} from './requests';
import { AppDataSource } from "./data-source"
const dotenv = require("dotenv");
dotenv.config();

// create and setup express app
const app = express();
app.use(express.json());

AppDataSource.initialize().then(async () => {

    app.post('/users', async (req: Request, res: Response) => {
        try {
            const request = new UserCreateRequest(req);
            const response = await UserController.create(request);
            res.send({res: response});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.get('/users', async (req: Request, res: Response) => {
        const users = await UserController.getUsers();
        res.send({saved: users});
    });

    app.put('/users',async (req: Request, res: Response) => {
        try {
            const request = new UserUpdateRequest(req);
            const response = await UserController.update(request);
            res.send({res: response});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    })

    app.delete('/users', async (req: Request, res: Response) => {
        try {
            const request = new UserDeleteRequest(req);
            const response = await UserController.delete(request);
            res.send({res: response});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.get('/user/:id/assets', async (req: Request, res: Response) => {
        try {
            const request = new AssetRetreiveRequest(req);
            const assets = await AssetController.getAssets(request.getUserId());
            res.send({assets: assets});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.post('/user/:id/assets', async (req: Request, res: Response) => {
        try {
            const request = new AssetCreateRequest(req);
            await AssetController.create(request);
            res.send({saved: true});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.put('/user/:idUser/assets/:idAsset', async (req: Request, res: Response) => {
        try {
            const request = new AssetUpdateRequest(req);
            await AssetController.update(request);
            res.send({edited: true});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.listen(3000, () => console.log('App listening'));

}).catch(error => console.log(error))
