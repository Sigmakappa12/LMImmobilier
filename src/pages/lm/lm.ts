import { Component, ChangeDetectionStrategy , ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { NavController, AlertController, NavParams , Nav, LoadingController} from 'ionic-angular';
import { MainPage } from './main/main';
import { CreerComptePage } from '../lm/login/creerCompte/creerCompte';
//import { NativeStoragePage } from '../native-storage/native-storage';
import  firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

import { LoginPage } from './login/login';
import { EventPage } from './event/event';
import { FirebaseAuth } from '@firebase/auth-types';

@Component({
  selector: 'page-LM',
  templateUrl: 'LM.html'
})
export class LMPage {
  reload: any;
  //@ViewChild(Nav) nav: Nav;
  //@ViewChild('logged') logged: ElementRef ;
  //@ViewChild('login') login: ElementRef ;
  user = firebase.auth().currentUser;



  constructor(public navCtrl: NavController,public navParams: NavParams, public loadingCtrl: LoadingController) {
    
    //if (this.user) this.presentLoadingCustom();
    
    //this.ionViewDidLoad();
    //this.ionViewDidLoad();
    //this.ngAfterViewInit();
    //this.ionViewWillEnter();
    //console.log("DANSLM",this.user);
    //this.user=navParams.get('user');
    //this.reload=navParams.get('reload');
    /*firebase.auth().onAuthStateChanged(user => {
      if (!user) {
       
        //console.log("NO USER", this.reload);
        //document.getElementById("logged").style.display = "block";
        //document.getElementById("login").style.display = "none";
        //if (this.reload!=0){this.reload=0;this.navCtrl.setRoot(LMPage,{reload: this.reload});}
       //this.navCtrl.setRoot(this.navCtrl.getActive().component);
       
      } else if (user) {
        console.log("USER");
        document.getElementById("logged").style.display = "none";
        document.getElementById("login").style.display = "block";
        //this.rootPage = HomePage;
       
        //if (this.reload!=1){
          //this.reload=1;
          
          
        // this.nav.remove(this.nav.last().index)
        //.then(
          //() => {
            //this.nav.push(LMPage, {
              //reload: this.reload
            //});
          //},
          //error => {}
        //);
         // this.reload=1;this.navCtrl.setRoot(LMPage,{reload: this.reload, user: this.user});}
        
      //}
      
    }});*/


    


    //console.log("SORTIELM",this.user);



  }

      private presentLoadingCustom() {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: `Chargement...\n
          <div class="custom-spinner-container">
            <div class="custom-spinner-box"></div>
          </div>`,
        duration: 3800

      });

      loading.present();



      }



  private showLogin() {
    
    //console.log(this.id);
    //console.log(this.password);
    
    /*let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(LoginPage).then(() => {
          this.navCtrl.remove(currentIndex);
          });*/
    this.navCtrl.push(LoginPage);
    //this.nav.pop(LMPage);
  }

  public logOut(){
    firebase.auth().signOut().then(function() {
      //Sign out success.
    }).catch(function(error) {
      //An Error.
    });
    //this.ionViewDidLoad();
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
       
  }

  private showVueVentePage(){
    this.navCtrl.setRoot(MainPage);
  }

  private showEvent() {
    
    //console.log(this.id);
    //console.log(this.password);
    this.navCtrl.push(EventPage);
  }
  /*ngAfterViewInit(){
    // the code to be called when the dom has loaded
    // #document has its nodes
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
       
        //console.log("NO USER", this.reload);
        document.getElementById("logged").style.display = "none";
        document.getElementById("login").style.display = "block";
        //if (this.reload!=0){this.reload=0;this.navCtrl.setRoot(LMPage,{reload: this.reload});}
       //this.navCtrl.setRoot(this.navCtrl.getActive().component);
       
      } else if (user) {
        console.log("USER");
        document.getElementById("logged").style.display = "block";
        document.getElementById("login").style.display = "none";
        //this.rootPage = HomePage;
       
        //if (this.reload!=1){
          //this.reload=1;
          
          
        // this.nav.remove(this.nav.last().index)
        //.then(
          //() => {
            //this.nav.push(LMPage, {
              //reload: this.reload
            //});
          //},
          //error => {}
        //);
         // this.reload=1;this.navCtrl.setRoot(LMPage,{reload: this.reload, user: this.user});}
        
      //}
      
    }});

  }*/








  /*ionViewWillEnter(){
    
    
    console.log("VIEWENTER",this.user);
    //console.log(this.navCtrl.getActive().component," UIUICOMPONENT ACTIVE");
    //document.getElementById("loading").style.display = "block";
    
    //firebase.auth().onAuthStateChanged(user => {
      console.log(this.navCtrl.getActive().component," UIUICOMPONENT ACTIVE");
      console.log("LOAD");
      if (!this.user) {
        console.log("VIEWNOUSER");
        //console.log("NO USER", this.reload);
        
        //document.getElementById("loading").style.display = "none";
        //document.getElementById('logged').style.display = "none";
        //document.getElementById('login').style.display = "block";
        console.log("ELEMENT OK");
        //if (this.reload!=0){this.reload=0;this.navCtrl.setRoot(LMPage,{reload: this.reload});}
       //this.navCtrl.setRoot(this.navCtrl.getActive().component);
       
      } else if (this.user && (this.navCtrl.getActive().component==LMPage|| this.navCtrl.getActive().component==VueVentePage)) {
        console.log("VIEWUSER");
        
        //document.getElementById("loading").style.display = "none";
        //document.getElementById("logged").style.display = "block";
        //document.getElementById("login").style.display = "none";
        
        //this.rootPage = HomePage;
       
        //if (this.reload!=1){
          //this.reload=1;
          
          
        // this.nav.remove(this.nav.last().index)
        //.then(
          //() => {
            //this.nav.push(LMPage, {
              //reload: this.reload
            //});
          //},
          //error => {}
        //);
         // this.reload=1;this.navCtrl.setRoot(LMPage,{reload: this.reload, user: this.user});}
        
      //}
      
      }
    console.log("SORTIEVIEW");
   // });
  
  

    //this.user=this.navParams.get('user');
    //document.getElementById("logged").style.display = "initial";
      //document.getElementById("login").style.display = "none";
  }*/


}
