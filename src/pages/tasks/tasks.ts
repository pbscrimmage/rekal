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
        this.database.getRecords().then((result) => {
            console.log("LOAD", result);
            this.recordList = <Array<Object>> result;
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }
 
    delete(index: number) {
        //this.recordList.splice(index, 1);
        //localStorage.setItem("tasks", JSON.stringify(this.taskList));
    }
 
    add() {
        this.nav.push(AddPage);
    }
 
}
