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

    public constructor() {
        if(!this.isOpen) {
            this.storage = new SQLite();
            this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
                this.isOpen = true;
                this.storage.executeSql("CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, category TEXT, text TEXT)", {}).then(() => {
                }, (err) => {
                    console.log("ERROR Creating table", err);
                });
            }, (err) => {
                console.log("ERROR opening database", err);
            });
        }
    }

    public getRecords() {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM records", []).then((data) => {
                let records = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        records.push({
                            id: data.rows.item(i).id,
                            date: data.rows.item(i).date,
                            category: data.rows.item(i).category,
                            text: data.rows.item(i).text
                        });
                    }
                }
                console.log("GET RECORDS", records);
                resolve(records);
            }, (error) => {
                console.log("ERROR on GET", error);
                reject(error);
            });
        });
    }
 
    public createRecord(date: string, category: string, text: string) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("INSERT INTO records (date, category, text) VALUES (?, ?, ?)", [date, category, text]).then((data) => {
                resolve(data);
            }, (error) => {
                console.log("ERROR on CREATE", error);
                reject(error);
            });
        });
    }
}
