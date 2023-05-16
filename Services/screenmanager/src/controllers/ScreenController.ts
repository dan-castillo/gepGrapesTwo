import { Request, Response } from 'express';
import { ScreenService } from '../services/ScreenService';

let screenService = new ScreenService();

export class ScreenController {

    public createScreen(req: Request, res: Response) {
        screenService.createScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllScreen(req: Request, res: Response) {
        console.log('entering into get all screensare ')
        screenService.getAllScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateScreen(req: Request, res: Response) {
        console.log('entering into update screen');
        screenService.updateScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteScreen(req: Request, res: Response) {
        screenService.deleteScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public getScreenById(req: Request, res: Response) {
        screenService.getScreenById(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}