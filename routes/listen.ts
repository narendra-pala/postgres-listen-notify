import { Request, Response } from 'express';

export class ListenRoutes {
    public routes(app): void {
        app.route('/listen')
            .get((req:Request, res: Response) => {
                res.status(200).send({
                    message: "Hello from /listen !!"
                });
            })
    }
}