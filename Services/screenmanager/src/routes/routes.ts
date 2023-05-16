
import { ScreenController } from '../controllers/ScreenController';


export class Routes {

    public screenController: ScreenController = new ScreenController();

    public routes(app): void {
        app.route('/screen/save').post(this.screenController.createScreen);
        app.route('/screen/get').get(this.screenController.getAllScreen);
        app.route('/screen/get/:id').get(this.screenController.getScreenById);
        app.route('/screen/update/:id').post(this.screenController.updateScreen);
        app.route('/screen/delete/:id').delete(this.screenController.deleteScreen);
    }
}