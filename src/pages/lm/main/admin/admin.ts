import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChoixCollaborateurPage } from '../choixCollaborateur/choixCollaborateur';
import { LMPage } from '../../../lm/lm';
import  firebase  from 'firebase';
//import { MenuPage } from '../menu/menu';
import { CreateWorkerPage } from './createWorker/createWorker';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as admin from 'firebase-admin';

/*var serviceAccount = require('/Users/max/Desktop/MobileProject/testapp/src/app/lmimmobilier-ca1ac-firebase-adminsdk-p1ars-e862321ac1.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lmimmobilier-ca1ac.firebaseio.com"
});
*/

@Component({
  selector: 'page-Admin',
  templateUrl: 'Admin.html'
})
export class AdminPage {
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

    constructor(public navCtrl: NavController) {
       
    }
      
      public createWorker(){
        this.navCtrl.push(CreateWorkerPage);
      }

      public delUser(){
        window.alert("A Faire");
      }

      public seePropositions(){
        window.alert("A Faire");
      }

      public seeMailsPhones(){
        window.alert("A Faire");
      }

      
}
