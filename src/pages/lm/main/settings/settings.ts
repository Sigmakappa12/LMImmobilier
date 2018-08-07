import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { MainPage } from '../../main/main';
import { CreerComptePage } from '../../login/creerCompte/creerCompte';
import { PropositionVentePage } from '../../main/choixCollaborateur/propositionVente/propositionVente';
import  firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import * as $ from 'jquery';
import { database } from '../../../../../node_modules/firebase-admin';
export const config = {
  apiKey: "AIzaSyDiqR_skUnvinHsu92bb6U9AjfMrryFigM",
  authDomain: "lmimmobilier-ca1ac.firebaseapp.com",
  databaseURL: "https://lmimmobilier-ca1ac.firebaseio.com",
  projectId: "lmimmobilier-ca1ac",
  storageBucket: "lmimmobilier-ca1ac.appspot.com",
  messagingSenderId: "782265547191"
};
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  user = firebase.auth().currentUser;
  id: string;
  password: string;
  postalCode: string;
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
  //checkUsersRef = this.usersRef;
  url: string;
  //password: any;
  usersRef = this.database.ref('users');
  phonesRef = this.database.ref('phones');
  mailsRef = this.database.ref('mails');
  goodRef: any;
  provider: any;


  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    var provider=this.provider;
    this.user.providerData.forEach(function (profile) {
      console.log(provider,profile.providerId);
      if (profile.providerId=="facebook.com") provider=profile.providerId;
      else if (profile.providerId=="google.com") provider=profile.providerId;

    });

    this.provider=provider;

    var id=this.user.displayName;
    var uid=this.user.uid;
    console.log(id,uid);
    var loadingCtrl=this.loadingCtrl;


    function LoadingCustom() {
      let loading = loadingCtrl.create({
        spinner: 'bubbles',
        content: `Chargement du profil...
          <div class="custom-spinner-container">
            <div class="custom-spinner-box"></div>
          </div>,`,
        duration: 3000
  
      });
  
      loading.present();
  
  
  
    }
    
    LoadingCustom()

    firebase.database().ref('/users/'+id).once('value').then(function(snapshot) {

      if (snapshot.val()){
       
        var username = snapshot.val().id;
        console.log("COMPTE UTILISATEUR",username,id);
        
        var data = {
          civility: snapshot.val().civility,
          name: snapshot.val().name,
          surname: snapshot.val().surname,
          postalCode: snapshot.val().postalCode,
          town: snapshot.val().town,
          country: snapshot.val().country,
          phone: snapshot.val().phone,
          mail: snapshot.val().mail,
          parrainID: snapshot.val().parrainID,
          photoURL: snapshot.val().url,
          titre: snapshot.val().title,
          text: " ",
          id: snapshot.val().name+" "+snapshot.val().surname,
          password: snapshot.val().password,
          role: snapshot.val().role,
         
        }

        $("#civility").append(data.civility);
        $("#name").append(data.name);
        $("#parrainID").append(data.parrainID);
        $("#surname").append(data.surname);
        $("#postalCode").append(data.postalCode);
        $("#town").append(data.town);
        $("#country").append(data.country);
        $("#phone").append(data.phone);
        $("#mail").append(data.mail);
        $("#password").append(data.password);
       // this.civility=snapshot.val().civility;



        console.log("DATA",data);
      }else{
        
        firebase.database().ref('/workers/'+id).once('value').then(function(snapshot) {
        username = snapshot.val().id ;
        console.log("COMPTE EMPLOYE",username,id);
        var data = {
          civility: snapshot.val().civility,
          name: snapshot.val().name,
          surname: snapshot.val().surname,
          postalCode: snapshot.val().postalCode,
          town: snapshot.val().town,
          country: snapshot.val().country,
          phone: snapshot.val().phone,
          mail: snapshot.val().mail,
          parrainID: "Aucun",
          photoURL: snapshot.val().url,
          titre: snapshot.val().title,
          text: " ",
          id: snapshot.val().name+" "+snapshot.val().surname,
          password: snapshot.val().password,
          role: snapshot.val().role,
         
        }
        $("#civility").append(data.civility);
        $("#name").append(data.name);
        $("#parrainID").append(data.parrainID);
        $("#surname").append(data.surname);
        $("#postalCode").append(data.postalCode);
        $("#town").append(data.town);
        $("#country").append(data.country);
        $("#phone").append(data.phone);
        $("#mail").append(data.mail);
        $("#password").append(data.password);
       
        console.log("DATA",data);
        });
      }
      
    });
    $(document).ready(function() {
      $("validButton").attr('hidden');
    });
    $("validButton").attr('hidden');
  }


  




  public changeListener($event): void {
    this.file = $event.target.files[0];
  } 

  public logOut(){
      
     
      firebase.auth().signOut().then(function() {
        //Sign out success.
      }).catch(function(error) {
        //An Error.
      });
      //this.navCtrl.push(LMPage);
      //this.navCtrl.setRoot(LMPage);
      //console.log("LOGOUTVente");
  }

    
  

    public editPostalCode(){
      
      const prompt = this.alertCtrl.create({
        title: 'Nouveau Code Postal :',
        message: "Validez les changements en bas de l'écran après avoir cliqué sur OK",
        inputs: [
          {
            name: 'postalCode',
            placeholder: 'ex: 59000'
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          
          },
          {
            text: 'Ok',
            handler: data => {

              if (!data.postalCode.match(/^\d{5}$/)) window.alert("Code Postal Invalide")
              else {
                this.postalCode=data.postalCode;
                $("#postalCode").text(this.postalCode);
                //$("validButton").removeAttr('hidden');
                console.log('Saved clicked',data,this.postalCode);
              }
            }
          }
        ]
      });
      prompt.present();
      
    }

    public editTown(){
      const prompt = this.alertCtrl.create({
        title: 'Nouvelle Ville :',
        message: "Validez les changements en bas de l'écran après avoir cliqué sur OK",
        inputs: [
          {
            name: 'town',
            placeholder: 'ex: Paris'
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          
          },
          {
            text: 'Ok',
            handler: data => {
              this.town=data.town;
              $("#town").text(this.town);
              //$("validButton").show();
              console.log('Saved clicked',data,this.town);
            }
          }
        ]
      });
      prompt.present();
    }

    public editCountry(){
      const prompt = this.alertCtrl.create({
        title: 'Nouveau Pays :',
        message: "Validez les changements en bas de l'écran après avoir cliqué sur OK",
        inputs: [
          {
            name: 'country',
            placeholder: 'ex: France'
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          
          },
          {
            text: 'Ok',
            handler: data => {
                this.country=data.country;
              if (!(this.pays.indexOf(data.country.toUpperCase())> -1 )) window.alert("Nom de pays Invalide")
              else {
                this.country=data.country;
              $("#country").text(this.country);
              $("validButton").show();
              console.log('Saved clicked',data,this.country);
              }
            }
          }
        ]
      });
      prompt.present();
    }

    public editPhone(){
      const prompt = this.alertCtrl.create({
        title: 'Nouveau Numéro :',
        message: "Validez les changements en bas de l'écran après avoir cliqué sur OK",
        inputs: [
          {
            name: 'phone',
            placeholder: 'ex: 0836656565'
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          
          },
          {
            text: 'Ok',
            handler: data => {
              if (!data.phone.match(/^\d{10}$/)) window.alert("Numéro de téléphone Invalide")
              else {
                this.phone=data.phone;
                this.oldPhone=$("#phone").text();
              $("#phone").text(this.phone);
              //$("validButton").show();
              console.log('Saved clicked',data,this.phone);
              }
            }
          }
        ]
      });
      prompt.present();
    }
    
    public editMail(){
      const prompt = this.alertCtrl.create({
        title: 'Nouveau Email :',
        message: "Validez les changements en bas de l'écran après avoir cliqué sur OK",
        inputs: [
          {
            name: 'mail',
            placeholder: 'ex: lm.immobilier@gmail.com'
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          
          },
          {
            text: 'Ok',
            handler: data => {
              if (!data.mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) window.alert("Adresse Mail Invalide")
              else {
                this.mail=data.mail;
                this.oldMail=$("#mail").text();
                $("#mail").text(this.mail);
                //$("validButton").show();
                console.log('Saved clicked',data,this.mail);
              }
            }
          }
        ]
      });
      prompt.present();
    }
    
    public editPassword(){
      const prompt = this.alertCtrl.create({
        title: 'Nouveau Mot de Passe :',
        message: "Validez les changements en bas de l'écran après avoir cliqué sur OK",
        inputs: [
          {
            name: 'password',
            placeholder: 'ex: lmimmo'
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          
          },
          {
            text: 'Ok',
            handler: data => {
              if (data.password.length<6) window.alert("Mot de passe trop court, minimum 6 caractères")
              else {
                this.password=data.password;
                $("#password").text(this.password);
                //$("validButton").show();
                console.log('Saved clicked',data,this.password);
              }
            }
          }
        ]
      });
      prompt.present();
    }
    

    
    
    
    
    



    public valid(){
      var loadingCtrl=this.loadingCtrl;


      function finalLoadingCustom() {
        let loading = loadingCtrl.create({
          spinner: 'bubbles',
          content: `Mise à jour du profil...
            <div class="custom-spinner-container">
              <div class="custom-spinner-box"></div>
            </div>,`,
          duration: 6000
    
        });
    
        loading.present();
    
    
    
      }

      var storage = this.storage;
      var user=this.user;
      var database=this.database;
      var mail=this.mail;
      var file=this.file;
      //var url=this.url;
      console.log(this.postalCode,this.town,this.country,this.phone,this.mail,this.password,this.goodRef);
    
      var labelText = $("#parrainID").text();
      console.log(labelText);
      var goodRef=this.goodRef;
      var phone=this.phone;

      if (!labelText.toLowerCase().localeCompare('aucun')) {goodRef='workers';var goodPhonesRef="workersPhones";var goodMailsRef="workersMails"}
      else {goodRef='users';goodPhonesRef="phones";goodMailsRef="mails";}
      
      if(this.file){
        var photoRef = storage.ref(goodRef).child(user.displayName).child(file.name);
        var uploadPhoto = photoRef.put(file).then((snapshot) =>{
            this.url = snapshot.downloadURL;
        });
        finalLoadingCustom();
        console.log(this.url, user.photoURL);
        setTimeout(() => {
        firebase.database().ref(goodRef).child(user.displayName).update({photoURL: this.url});
        user.updateProfile({displayName: user.displayName,photoURL: this.url});
        },5000);
      }
      if(this.postalCode) database.ref(goodRef).child(this.user.displayName).update({postalCode: this.postalCode});
      if(this.town) database.ref(goodRef).child(this.user.displayName).update({town: this.town});                                         
      if(this.country) database.ref(goodRef).child(this.user.displayName).update({country: this.country});
      if(this.phone) {
        database.ref(goodPhonesRef).child(this.oldPhone).set(null, function (error) {
          if (error) {
            window.alert("Numéro de téléphone déjà utilisé pour un autre compte, veuillez contacter l'administrateur.");
          } else {
            database.ref(goodRef).child(user.displayName).update({phone: phone});
            database.ref(goodPhonesRef).child(phone).set(user.displayName);
        
        
        
          }
        });   
      }

      if(this.mail) {
        var dotOldMail=this.oldMail.replace(/\./g,"_dot_");
        var dotMail=this.mail.replace(/\./g,"_dot_");
        database.ref(goodMailsRef).child(dotOldMail).set(null, function (error) {
          if (error) {
            window.alert("Adresse Email déjà utilisée pour un autre compte, veuillez contacter l'administrateur.");
          } else {
            database.ref(goodRef).child(user.displayName).update({mail: mail});
            database.ref(goodMailsRef).child(dotMail).set(user.displayName);
            user.updateEmail(mail).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              window.alert("Error: "+ errorMessage);
              
            });;
        
        
        
          }
        });
        
      }
      if(this.password) {
        database.ref(goodRef).child(this.user.displayName).update({password: this.password});
        user.updatePassword(this.password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          window.alert("Error: "+ errorMessage);
          
        });;
      }
      //$("validButton").hide();
      this.postalCode=null;
      this.town=null;
      this.phone=null;
      this.country=null;
      this.password=null;
      this.mail=null;
      this.file=null;
    }


    public linkWithFb() {

      //var thirdApp = firebase.initializeApp(config, "third");
      
      var providerFacebook = new firebase.auth.FacebookAuthProvider();

      

      //console.log($("#password").text(),this.user.email,thirdApp.auth().currentUser);


      /*firebase.auth().signInWithEmailAndPassword(this.user.email, $("#password").text()).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: "+ errorMessage);
        
      });*/
      //setTimeout(() => {
      firebase.auth().currentUser.linkWithRedirect(providerFacebook).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: "+ errorMessage);
      
      });
      var usersRef = this.usersRef;
      var user = this.user;
      var photoUrl = user.photoURL.toString();
      photoUrl = photoUrl + "?height=500";
      usersRef.child(user.displayName).update({photoURL: photoUrl});
      user.updateProfile({
      displayName: user.displayName,
      photoURL: photoUrl});
      //thirdApp.auth().signOut();
      //thirdApp.delete();
      //},5000);
             
  
    }




    public linkWithGoogle() {

      //var thirdApp = firebase.initializeApp(config, "third");
      var providerGoogle = new firebase.auth.GoogleAuthProvider();

      /*firebase.auth().signInWithEmailAndPassword(this.user.email, $("#password").text()).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: "+ errorMessage);
        
      });*/
      //setTimeout(() => {
      firebase.auth().currentUser.linkWithRedirect(providerGoogle);
      //firebase.auth().signOut();
      //thirdApp.delete();
      //},5000);
      var usersRef = this.usersRef;
      var user = this.user;
      var photoUrl = user.photoURL.toString();
      photoUrl = photoUrl + "?height=500";
      usersRef.child(user.displayName).update({photoURL: photoUrl});
      user.updateProfile({
      displayName: user.displayName,
      photoURL: photoUrl});
    }
}
