import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = "IntroPage";
  pages: Array<{title: string, component: string, icon: string}>;
  loggedIn: boolean = false;

  constructor(public platform: Platform, 
              private events: Events,
              public http: Http,
              private storage: Storage,  
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
        { title: 'Home', component: "HomePage", icon: ''},
    ];


  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.rootPage = "TabPage";
      
      this.events.subscribe('user:login', (params) => {
        console.log("In login event", params);
        this.loggedIn = true;
      });

      this.events.subscribe('user:logout', (params) => {
        console.log("In Logout event", params);
        this.loggedIn = false;
      })

      this.storage.ready().then( () => {
          this.storage.get('loginInfo').then(
            (data)=>{
                if(data !== null)
                  this.events.publish('user:login');
                else
                  this.events.publish('user:logout');

            })
      })
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  IntroPage(){
    this.nav.setRoot("IntroPage");
  }

  HomePage() {
    this.nav.setRoot("HomePage");
  }


}

