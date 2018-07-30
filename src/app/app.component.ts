import { Component , ViewChild} from '@angular/core';
import { Platform, MenuController, Nav, NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase'; 
import { LMPage } from '../pages/lm/lm';

import { EventPage } from '../pages/event/event'
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { VueVentePage } from '../pages/VueVente/VueVente';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import * as $ from 'jquery';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any=LMPage;
  name: any;
  email: any;
  photoUrl: any;
  emailVerified: any;
  uid: any;
  users: any[];
  
  user = firebase.auth().currentUser;
  providerGoogle = new firebase.auth.GoogleAuthProvider();
  providerFacebook = new firebase.auth.FacebookAuthProvider();
  //user = firebase.auth().currentUser;
  @ViewChild(Nav) nav: Nav;

  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, menu: MenuController, private usersBase: AngularFireDatabase,public loadingCtrl: LoadingController){
    //var displayName = this.user.displayName;
    //var database = firebase.database();
    //var ref = database.ref('scores/pseudo');

    /*var data = {
      name: "Max",
      score: "43"
    }*/


    //ref.push(data);
    this.presentLoadingCustom();
        
    
    console.log("currentuser",this.user);
    firebase.auth().onAuthStateChanged(user => {
      if (!this.user) {
        this.nav.setRoot(LMPage);
        
        console.log("APPCOMPONENT NO USER");
        if (!this.user && (this.rootPage==LMPage|| this.rootPage==VueVentePage)) {
          console.log("VIEWNOUSER");
          
          //console.log("NO USER", this.reload);
          
          //document.getElementById("loading").style.display = "none";
          //document.getElementById("logged").style.display = "none";
          //document.getElementById("login").style.display = "block";
          console.log("ELEMENT OK");
          //if (this.reload!=0){this.reload=0;this.navCtrl.setRoot(LMPage,{reload: this.reload});}
         //this.navCtrl.setRoot(this.navCtrl.getActive().component);
         
        }  
      } else {

        if (this.user && (this.rootPage==LMPage|| this.rootPage==VueVentePage)) {
          console.log("VIEWUSER");
          this.nav.setRoot(this.nav.getActive().component);
          //document.getElementById("loading").style.display = "none";
          //document.getElementById("logged").style.display = "block";
          //document.getElementById("login").style.display = "none";
        }
        this.user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });


        console.log("APPCOMPONENTUSER");
          this.name = user.displayName;
          this.email = user.email;
          this.photoUrl = user.photoURL;
          this.emailVerified = user.emailVerified;
          this.uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
        
        console.log("APPCOMPONENTUSERAUTH",user);
        
        if (this.rootPage==LMPage){

        }
        
        
        };
        
    })
    //this.rootPage = LMPage;
    
    
    
    
    
    
    //console.log("APPCOMPONENTNOAUTH",this.user);
    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      //this.rootPage = this.user ? LMPage : LoginPage;
    });
    
  }


  public showEvent(){
    this.rootPage=EventPage;
  }

public showDashboard(){
  this.rootPage=DashboardPage;
}

private presentLoadingCustom() {
  let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: `<p>Chargement...</p>
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
    duration: 3800

  });

  loading.present();



}
  


}
