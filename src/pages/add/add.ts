import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {Database} from "../../providers/database";

@Component({
    templateUrl: 'add.html'
})
export class AddPage {

    public pageTitle: string;
    public recordDate: string;
    public recordCategory: string;
    public recordTitle: string;
    public recordText: string;
    public recordId: number;
    private record: Object;
    private updateMode: boolean;

    constructor(public nav: NavController, private navParams: NavParams, private database: Database) {
        this.updateMode = false;
        this.pageTitle = "Create";
        this.recordDate = new Date().toISOString();
        this.recordCategory = "";
        this.recordTitle = "";
        this.recordText = "";

        if (navParams.get('record')) {
            this.updateMode = true;
            this.pageTitle = "Update";
            this.record = navParams.get('record');
            this.recordDate = this.record['date'];
            this.recordCategory = this.record['category'];
            this.recordTitle = this.record['title'];
            console.log("IN EDIT", this.record['title']);
            this.recordText = this.record['text'];
            this.recordId = this.record['id'];
        }
    }

    public create(recordDate: string, recordCategory: string, recordTitle: string, recordText: string) {
        console.log("CREATE", recordText);
        this.database.createRecord(recordDate, recordCategory, recordTitle, recordText).then((result) => {
            this.nav.pop();
        }, (error) => {
            console.log("ERROR CREATING", error.toString());
        });
    }

    public update(recordDate: string, recordCategory: string, recordTitle: string, recordText: string, recordId: number) {
        console.log("UPDATE", recordTitle);
        this.database.updateRecord(recordDate, recordCategory, recordTitle, recordText, recordId).then((result) => {
            this.nav.pop();
        }, (error) => {
            console.log("ERROR UPDATING", error.toString());
        });
    }

    save() {
        //console.log("Saving Title", this.recordTitle);
        if (this.updateMode) {
            this.update(this.recordDate, this.recordCategory, this.recordTitle, this.recordText, this.recordId);
            this.updateMode = false;
        } else {
        //if(this.recordDate !== "" && this.recordCategory !== "" && this.recordText !== "") {
            this.create(this.recordDate, this.recordCategory, this.recordTitle, this.recordText);
        //}
        }
    }
}

