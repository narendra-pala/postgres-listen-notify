import { Request, Response } from 'express';
import { ListenRoutes } from './listen';
export class Routes {
    public listenRoutes: ListenRoutes = new ListenRoutes();

    public routes(app): void {
        app.route('/')
            .get((req:Request, res: Response) => {
                res.status(200).send({
                    message: "Welcome to the awesome api.. :)!!"
                });
            });
        this.listenRoutes.routes(app);
    }
}