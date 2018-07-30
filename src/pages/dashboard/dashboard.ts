import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChoixCollaborateurPage } from '../choixCollaborateur/choixCollaborateur';
import  firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'page-Dashboard',
  templateUrl: 'Dashboard.html'
})
export class DashboardPage {
    user = firebase.auth().currentUser;
    id: string;
    password: string;
    postalCode: number;
    town: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,) {
        this.id=navParams.get("id");
        this.password=navParams.get("password");
        
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
          console.log("OUTVENTEPAGE");
        firebase.auth().signOut().then(function() {
          //Sign out success.
        }).catch(function(error) {
          //An Error.
        });
      }

}
