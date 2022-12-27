import * as express from "express"
import { Request, Response } from "express"
import { UserController, AssetController } from "./controllers";
import { UserCreateRequest,
    UserUpdateRequest,
    UserDeleteRequest,
    AssetRetreiveRequest,
    AssetCreateRequest,
    AssetUpdateRequest,
    AssetDeleteRequest,
    UserLoginRequest,
} from './requests';
import { AppDataSource } from "./data-source"
const dotenv = require("dotenv");
dotenv.config();

// create and setup express app
const app = express();
app.use(express.json());

AppDataSource.initialize().then(async () => {
    // requests handle logic and validation of incoming data: body and logged user
    // Controllers have the logic to save, edit or create
    
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

    app.post('/users/login', async (req: Request, res: Response) => {
        try {
            const request = new UserLoginRequest(req);
            const response = await UserController.login(request);
            res.send({token: response});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(404).send(err);
        }
    });

    app.get('/users', async (req: Request, res: Response) => {
        const users = await UserController.getUsers();
        res.send({saved: users});
    });

    app.put('/users',async (req: Request, res: Response) => {
        try {
            const request = new UserUpdateRequest(req);
            request.authenticateToken(req, res);
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
            request.authenticateToken(req, res);
            const response = await UserController.delete(request);
            res.send({res: response});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.get('/user/assets', async (req: Request, res: Response, next) => {
        try {
            const request = new AssetRetreiveRequest(req);
            request.authenticateToken(req, res);
            const assets = await AssetController.getAssets(request);
            res.send({assets: assets});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).send(err);
        }
    });

    app.post('/user/assets', async (req: Request, res: Response) => {
        try {
            const request = new AssetCreateRequest(req);
            request.authenticateToken(req, res);
            await AssetController.create(request);
            res.send({saved: true});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.put('/user/assets/:idAsset', async (req: Request, res: Response) => {
        try {
            const request = new AssetUpdateRequest(req);
            request.authenticateToken(req, res);
            await AssetController.update(request);
            res.send({edited: true});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.delete('/user/assets/:idAsset', async (req: Request, res: Response) => {
        try {
            const request = new AssetDeleteRequest(req);
            request.authenticateToken(req, res);
            await AssetController.delete(request);
            res.send({deleted: true});
        }
        catch (err) {
            res.statusMessage = err;
            res.status(400).end();
        }
    });

    app.listen(3000, () => console.log('App listening'));

}).catch(error => console.log(error))
