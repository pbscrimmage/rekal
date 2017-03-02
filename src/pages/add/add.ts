import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {Database} from "../../providers/database";

@Component({
    templateUrl: 'add.html'
})
export class AddPage {

    public recordDate: string;
    public recordCategory: string;
    public recordText: string;

    constructor(public nav: NavController, private database: Database) {
        this.recordDate = new Date().toISOString();
        this.recordCategory = "";
        this.recordText = "";
    }

    public create(recordDate: string, recordCategory: string, recordText: string) {
        console.log("IN CREATE", recordText);
        this.database.createRecord(recordDate, recordCategory, recordText).then((result) => {
            this.nav.pop();
        }, (error) => {
            console.log("ERROR CREATING", error.toString());
        });
    }

    save() {
        console.log("Saving", this.recordText);
        //if(this.recordDate !== "" && this.recordCategory !== "" && this.recordText !== "") {
            console.log("Really Saving");
            this.create(this.recordDate, this.recordCategory, this.recordText);
        //}
    }

}
