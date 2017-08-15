import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
//import {Database} from "../providers/database";
import { TasksPage } from '../pages/tasks/tasks';

@Component({
  templateUrl: 'app.html',
  //providers: [Database]
})
export class MyApp {
  rootPage = TasksPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
