'use strict'
import * as mongoose from 'mongoose';
import { ScreenSchema } from '../models/Screen';

const screenModel = mongoose.model('screen', ScreenSchema);


export class ScreenDao {
    constructor() { }

    public createScreen(screenData, callback) {
        console.log('save template result ----- ', screenData);
        let template = new screenModel(screenData);
        template.save().then((result) => {
            callback(result);
        }).catch((error) => {
            console.log('save template error -----  ', error);
            callback(error);
        });
    }

    public getAllScreen(callback) {
        screenModel.find().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }


    public getScreenById(req, callback) {
        let screenId = req.params.id;
        screenModel.find({ _id: screenId }).
            exec(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(result);
                }
            })
    }

    public updateScreen(req, callback) {
        console.log('update screen in dao --- ', req.body);
        let screendesigner = req.body;
        let defaultcss = new RegExp(/{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}|\*/gi);
        let duplicatevalue = screendesigner['gjs-css'].match(defaultcss);
        let changedvalue  = [...new Set(duplicatevalue)];
        let csschanges = changedvalue.join('');
        const diff = (diffBy, diffMe) => diffBy.split(diffMe)
        const C = diff(screendesigner['gjs-css'], csschanges);
        csschanges += C;
        let regex = /[,\s]/g;
        csschanges = csschanges.replace(regex, '');

        console.log('---------------the final css changes-----',csschanges);
        screendesigner['gjs-css'] = csschanges;

        
        console.log("_id in dao:",req.params.id);
        screenModel.findOneAndUpdate({ _id: req.params.id }, screendesigner , { new: true }, (err, result) => {
            if (err) {
                console.log('err in update ---- ', err);
                callback(err);
            } else {
                console.log('successfully updated ---- ', result);
                callback(result);
            }
        });
    }

    public deleteScreen(screenId, callback: CallableFunction) {
        screenModel.findByIdAndDelete(screenId, (err, screen) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted screen!' });
            }
        });
    }
}