import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {AddPage} from "../add/add";
import {Database} from "../../providers/database";

@Component({
    templateUrl: 'tasks.html'
})
export class TasksPage {

    public recordList: Array<Object>;

    constructor(private nav: NavController, private database: Database) {
        this.recordList = [];
    }

    ionViewDidEnter() {
        this.load();
   }

    public load() {
        this.database.getRecords().then((results) => {
            console.log("LOAD", results);
            this.recordList = <Array<Object>> results;
            console.log("IN GET", results[3]['title']);
        }, (error) => {
            console.log("ERROR on GET", error);
        });
    }

    public showDetail(record) {
        this.nav.push(AddPage, {record: record});
    }

    public delete(index: number) {
        this.database.deleteRecord(this.recordList[index]["id"]).then((result) => {
            console.log("DELETE", result);
            this.recordList.splice(index, 1);
        }, (error) => {
            console.log("ERROR on DELETE", error);
        });
    }

    add() {
        this.nav.push(AddPage);
    }

}
