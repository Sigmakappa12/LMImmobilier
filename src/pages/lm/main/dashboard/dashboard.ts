import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChoixCollaborateurPage } from '../choixCollaborateur/choixCollaborateur';
import  firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as $ from 'jquery';

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
  providerGoogle = new firebase.auth.GoogleAuthProvider();
  providerFacebook = new firebase.auth.FacebookAuthProvider();
  name: any;
  email: any;
  photoUrl: any;
  emailVerified: any;
  uid: any;
  users: any[];
  role: string;
  oldMail: any;
  oldPhone: any;
  database = firebase.database();
  workersRef = this.database.ref('workers');
  workersPhonesRef = this.database.ref('workersPhones');
  workersMailsRef = this.database.ref('workersMails');
  parrainID: string;
  civility: string;
  profilePhoto: any;
  surname: string;
  storage = firebase.storage();
  storageRef = this.storage.ref();
  workersStoreRef = this.storageRef.child('workers');
  usersStoreRef = this.storageRef.child('users');
  file: File = null;
  text: string;
  country: string;
  phone: string;
  mail: string;
  mailConfirm: string;
  title: string;
  filters = {};
  filteredUsers = {};
  setTest: any=0;
  pays: any=['ALLEMAGNE','BELGIQUE','FRANCE','ITALIE','LUXEMBOURG'];
  selectedFile: HTMLInputElement;
  url: string;
  usersRef = this.database.ref('users');
  phonesRef = this.database.ref('phones');
  mailsRef = this.database.ref('mails');
  toSaleRef = this.database.ref('toSell');
  salesRef = this.database.ref('sales');
  soldRef = this.database.ref('sold');
  goodRef: any;
  provider: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,) {
        
        var navCtrl=this.navCtrl;
        var toSaleRef=this.toSaleRef;
        var salesRef=this.salesRef;
        var soldRef=this.soldRef;
        var user=this.user;
        
        function br() {
          return document.createElement('br');
        }
        salesRef.orderByChild('user').equalTo('Sigmakappa').on("value", function(snapshot) {
       // salesRef.once('value').then(function(snapshot) {
         var keys=Object.keys(snapshot);
          console.log(keys,snapshot.child.name,snapshot.key,user.displayName);

          /*snapshot.forEach( function (data) {
            console.log(data.key);
          });*/

          /*let////////// postObject = snapshot.val();
          let workersKeys = Object.keys(postObject);
          let townKeys =  Object.keys(workersKeys);
          let adressKeys=Object.keys(townKeys);

          for (var i=0; i<workersKeys.length;i++) {
            //for (var j=0; j<keys.length;j++) {
            let currentRow;
            let currentObject = postObject[workersKeys[i]];
            //if (i%1 ==0) {
              currentRow = document.createElement("ion-button");
              currentRow.setAttribute("id",currentObject.id);
              
              $(currentRow).addClass("rowButton");
              $("#contentHolder").append(currentRow);
              
              document.getElementById(currentObject.id).addEventListener ("click", function() {
                console.log(document.getElementById(currentObject.id));
                //navCtrl.push(PropositionVentePage,{id: currentObject.id});
              });
            
            //}
            
          let col=document.createElement("div");
          $(col).addClass("choixDiv");
          
         
          var img=document.createElement("img");
         
          $(img).addClass("contentImg");
          img.src=currentObject.photoURL;
          console.log(currentObject);
       
          var id = document.createTextNode(currentObject.id);
          var role = document.createTextNode(currentObject.titre);
          var text = document.createTextNode(currentObject.text);
          var h = document.createElement("H4");
          $(h).addClass("h4");
          h.appendChild(text);
          console.log(img.src);
          console.log(currentRow.id);
          
          var lab=document.createElement("div");
          
          $(lab).addClass("lab");
         
          lab.setAttribute("align","justify");
         
          lab.appendChild(id);
          lab.appendChild(br());
          lab.appendChild(role);
          lab.appendChild(br());
          lab.appendChild(br());
          lab.appendChild(h);
         
          $(col).append(img);
          $(col).append(lab);
         
          
          $(currentRow).append(col);
          
          }
        //}

    
          console.log("sortieloadbutton");
        */
        });
      }

}
