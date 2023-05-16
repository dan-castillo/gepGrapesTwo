import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ScreenSchema = new Schema({
    'gjs-assets': [],
    'gjs-css': String,
    'gjs-styles': [String],
    'gjs-html': String,
    'gjs-components': [],
    screenName: String
})