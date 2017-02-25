import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {AddPage} from "../add/add";
 
@Component({
    templateUrl: 'tasks.html'
})
export class TasksPage {
 
    public taskList: Array<string>;
 
    constructor(private nav: NavController) { }
 
    onPageDidEnter() {
        this.taskList = JSON.parse(localStorage.getItem("tasks"));
        if(!this.taskList) {
            this.taskList = [];
        }
    }
 
    delete(index: number) {
        this.taskList.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.taskList));
    }
 
    add() {
        this.nav.push(AddPage);
    }
 
}
