import {openDatabase} from 'expo-sqlite';
import {BaseModel, types} from 'expo-sqlite-orm'
import {DB} from "../constants/app";

export default class ImagesDB extends BaseModel {
    constructor(obj) {
        super(obj)
    }

    static get database() {
        return async () => openDatabase(DB.DB)
    }

    static get tableName() {
        return DB.TABLE_IMAGE_DATA;
    }

    static findAll() {
        const sql = `SELECT * FROM ${DB.TABLE_IMAGE_DATA}`;
        const params = [null];
        return this.repository.databaseLayer.executeSql(sql, params).then(({rows}) => rows)
    }

    static get columnMapping() {
        return {
            id: {type: types.INTEGER, primary_key: true}, // For while only supports id as primary key
            processed: {type: types.BOOLEAN, default: false},
            name: {type: types.TEXT, not_null: true, unique: true},
            uri: {type: types.TEXT, unique: true},
            faceData: {type: types.TEXT},
            width: {type: types.INTEGER},
            height: {type: types.INTEGER}
        };
    }
}