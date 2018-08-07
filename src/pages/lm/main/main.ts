import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChoixCollaborateurPage } from './choixCollaborateur/choixCollaborateur';
import { LMPage } from '../../lm/lm';
import { AdminPage } from './admin/admin';
import { SettingsPage } from './settings/settings';
import { ParrainagePage } from './parrainage/parrainage';
import { MoviesPage } from './movies/movies';
import { EventPage } from '../event/event';
import { DashboardPage } from './dashboard/dashboard';
import  firebase  from 'firebase';
//import { MenuPage } from '../menu/menu';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'page-Main',
  templateUrl: 'Main.html'
})
export class MainPage {
    user = firebase.auth().currentUser;
    id: string;
    password: string;
    postalCode: number;
    town: string;
    providerGoogle = new firebase.auth.GoogleAuthProvider();
    providerFacebook = new firebase.auth.FacebookAuthProvider();
    name: any;
    email: any;
    photoUrl: any;
    emailVerified: any;
    uid: any;
    users: any[];
    database = firebase.database();
    usersRef = this.database.ref('users');
    phonesRef = this.database.ref('phones');
    mailsRef = this.database.ref('mails');

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.id=navParams.get("id");
        this.password=navParams.get("password");
        /*var usersRef = this.usersRef;
        var user = this.user;

        this.user.providerData.forEach(function (profile) {
          
           if (profile.providerId=="facebook.com"){
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);

            var photoUrl = profile.photoURL.toString();
            photoUrl = photoUrl + "?height=500";



            usersRef.child(user.displayName).update({photoURL: photoUrl});
            user.updateProfile({
              displayName: user.displayName,
              photoURL: photoUrl});
          } else if (profile.providerId=="google.com"){
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);


            photoUrl = profile.photoURL.toString();
            photoUrl = photoUrl + "?height=500";



            usersRef.child(user.displayName).update({photoURL: photoUrl});
            user.updateProfile({
              displayName: user.displayName,
              photoURL: photoUrl});
          } else {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          }
        
          
        
        });*/



        //this.id = navParams.get('id');
        //this.postalCode = navParams.get('postalCode');
        //this.town = navParams.get('town');
        //this.password = navParams.get('password');
        //console.log(this.id);
        //console.log(this.password);
        //this.navCtrl.setRoot(VueVentePage);
    }

  
    public showChoixCollaborateur(): void {
    
        //console.log(this.id);
        //console.log(this.password);
        this.navCtrl.push(ChoixCollaborateurPage);
    
    
      }

      public logOut(){
        
       
        firebase.auth().signOut().then(function() {
          //Sign out success.
        }).catch(function(error) {
          //An Error.
        });
        //this.navCtrl.push(LMPage);
        //this.navCtrl.setRoot(LMPage);
        console.log("LOGOUTVente");
      }
      
      
      
      public showAdmin(){
        console.log("go admin");
        this.navCtrl.push(AdminPage);
      }
      

      public showManage(){
        window.alert("A Faire");
      }

      public showSettings(){
        console.log("go settings");
        this.navCtrl.push(SettingsPage);
      }

      public showDashboard(){
        console.log("go dashboard");
        this.navCtrl.push(DashboardPage);
      }

      public showLink(){
        window.alert("A Faire");
      }

      public showGodfather(){
        window.alert("A Faire");
      }

      public showMovies(){
        window.alert("A Faire");
      }

      public logEvent(){
        window.alert("A Faire");
      }
}
