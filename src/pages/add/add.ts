import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {Database} from "../../providers/database";

@Component({
    templateUrl: 'add.html'
})
export class AddPage {

    public title: string;
    public recordDate: string;
    public recordCategory: string;
    public recordText: string;
    public recordId: number;
    private record: Object;
    private updateMode: boolean;

    constructor(public nav: NavController, private navParams: NavParams, private database: Database) {
        this.updateMode = false;
        this.title = "Create";
        this.recordDate = new Date().toISOString();
        this.recordCategory = "";
        this.recordText = "";

        if (navParams.get('record')) {
            this.updateMode = true;
            this.title = "Update";
            this.record = navParams.get('record');
            this.recordDate = this.record['date'];
            this.recordCategory = this.record['category'];
            this.recordText = this.record['text'];
            this.recordId = this.record['id'];
        }
    }

    public create(recordDate: string, recordCategory: string, recordText: string) {
        console.log("CREATE", recordText);
        this.database.createRecord(recordDate, recordCategory, recordText).then((result) => {
            this.nav.pop();
        }, (error) => {
            console.log("ERROR CREATING", error.toString());
        });
    }

    public update(recordDate: string, recordCategory: string, recordText: string, recordId: number) {
        console.log("UPDATE", recordId);
        this.database.updateRecord(recordDate, recordCategory, recordText, recordId).then((result) => {
            this.nav.pop();
        }, (error) => {
            console.log("ERROR UPDATING", error.toString());
        });
    }

    save() {
        console.log("Saving", this.recordText);
        if (this.updateMode) {
            this.update(this.recordDate, this.recordCategory, this.recordText, this.recordId);
            this.updateMode = false;
        } else {
        //if(this.recordDate !== "" && this.recordCategory !== "" && this.recordText !== "") {
            this.create(this.recordDate, this.recordCategory, this.recordText);
        //}
        }
    }

}
