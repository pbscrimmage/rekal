import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLite} from 'ionic-native';
/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

    private storage: SQLite;
    private isOpen: boolean;
    private schema: string;
    private createQuery: string;
    private updateQuery: string;

    public constructor() {
        if(!this.isOpen) {
            this.storage = new SQLite();
            this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
                this.isOpen = true;
                /*
                this.storage.executeSql("ALTER TABLE records ADD title TEXT", {}).then(() => {
                }, (err) => {
                    console.log("ERROR adding column", err.message);
                });
                */
                this.schema = "id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, category TEXT, title TEXT, text TEXT";

                this.storage.executeSql("CREATE TABLE IF NOT EXISTS records ("+ this.schema +")", {}).then(() => {
                }, (err) => {
                    console.log("ERROR Creating table", err.message);
                });
            }, (err) => {
                console.log("ERROR opening database", err.message);
            });
        }
    }

    public getRecords() {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM records ORDER BY date ASC", []).then((data) => {
                let records = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        records.push({
                            id: data.rows.item(i).id,
                            date: data.rows.item(i).date,
                            category: data.rows.item(i).category,
                            title: data.rows.item(i).title,
                            text: data.rows.item(i).text
                        });
                    }
                }
                console.log("GET RECORDS", records);
                resolve(records);
            }, (error) => {
                console.log("ERROR on GET", error.message);
                reject(error);
            });
        });
    }
 
    public createRecord(date: string, category: string, title: string, text: string) {
        return new Promise((resolve, reject) => {
            this.createQuery = "INSERT INTO records (date, category, title, text) VALUES (?, ?, ?, ?)";
            this.storage.executeSql(this.createQuery, [date, category, title, text]).then((data) => {
                resolve(data);
            }, (error) => {
                console.log("ERROR on CREATE", error.message);
                reject(error);
            });
        });
    }

    public updateRecord(date: string, category: string, title: string, text: string, id: number) {
        return new Promise((resolve, reject) => {
            this.updateQuery = "UPDATE records SET date = ?, category = ?, title = ?,text = ? WHERE (id = ?)"
            this.storage.executeSql(this.updateQuery, [date, category, title, text, id]).then((data) => {
                resolve(data);
            }, (error) => {
                console.log("ERROR on UPDATE", error.message);
                reject(error);
            });
        });
    }
    public deleteRecord(id: number) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("DELETE FROM records WHERE (id = ?)", [id]).then((data) => {
                resolve(data);
            }, (error) => {
                console.log("ERROR on DELETE", error.message);
                reject(error);
            });
        });
    }
}
