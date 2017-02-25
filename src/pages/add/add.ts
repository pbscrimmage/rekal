import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';

@Component({
    templateUrl: 'add.html'
})
export class AddPage {
 
    private taskList: Array<string>;
    public taskItem: string;
 
    constructor(public nav: NavController) {
        this.taskList = JSON.parse(localStorage.getItem("tasks"));
        if(!this.taskList) {
            this.taskList = [];
        }
        this.taskItem = "";
    }
 
    save() {
        if(this.taskItem != "") {
            this.taskList.push(this.taskItem);
            localStorage.setItem("tasks", JSON.stringify(this.taskList));
            this.nav.pop();
        }
    }
 
}
