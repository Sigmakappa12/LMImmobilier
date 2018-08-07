import { ChoixCollaborateurPage } from '../../choixCollaborateur/choixCollaborateur';
import { LMPage } from '../../../../lm/lm';
import  firebase  from 'firebase';
//import { MenuPage } from '../../menu/menu';
import { AdminPage } from '../admin';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../../../login/login';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
// Native Component
import { NativeStorage } from '@ionic-native/native-storage';
import { DataSnapshot } from '@firebase/database';
import { MainPage } from '../../../main/main';
import * as admin from 'firebase-admin';
import * as $ from 'jquery';

export const config = {
    apiKey: "AIzaSyDiqR_skUnvinHsu92bb6U9AjfMrryFigM",
    authDomain: "lmimmobilier-ca1ac.firebaseapp.com",
    databaseURL: "https://lmimmobilier-ca1ac.firebaseio.com",
    projectId: "lmimmobilier-ca1ac",
    storageBucket: "lmimmobilier-ca1ac.appspot.com",
    messagingSenderId: "782265547191"
  };
  
  let secondaryApp = firebase.initializeApp(config, "secondary");

@Component({
  selector: 'page-CreateWorker',
  templateUrl: 'CreateWorker.html'
})
export class CreateWorkerPage {
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
    //photoUrl: ../assets/imgs/building2.jpg;



    constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, public alertCtrl: AlertController, private db: AngularFireDatabase, public loadingCtrl: LoadingController) {
       
     
    }

    public changeListener($event): void {
        this.file = $event.target.files[0];
    }
    



    public showAdmin(){

        
        var file=this.file;
        console.log("FILE :",this.file);
        var loadingCtrl=this.loadingCtrl;
        var alertCtrl=this.alertCtrl;
        var url: string;
        function presentLoadingCustom() {
            let loading = loadingCtrl.create({
              spinner: 'bubbles',
              content: `Création du profil...
                <div class="custom-spinner-container">
                  <div class="custom-spinner-box"></div>
                </div>,`,
              duration: 6000
        
            });
        
            loading.present();
        
        
        
        }
        
        
        function finalLoadingCustom() {
            let loading = loadingCtrl.create({
              spinner: 'bubbles',
              content: `Mise en ligne du profil...
                <div class="custom-spinner-container">
                  <div class="custom-spinner-box"></div>
                </div>,`,
              duration: 6000
        
            });
        
            loading.present();
        
        
        
        }
       

        //let photoRef = this.photosRef.child(file.name);
        //var uploadPhoto = this.photosRef.put(file);
        //var downloadURL = uploadPhoto.snapshot.downloadURL;
        /*let selectedFile = (<HTMLInputElement>document.getElementById('file')).files[0];
        
        var photoName = selectedFile.name;
        var photoRef = this.photosRef.child(photoName);
       
        var uploadPhoto = this.photosRef.put(selectedFile);
        
        var downloadURL = uploadPhoto.snapshot.downloadURL;
        */

        //console.log(file,downloadURL);



        /*function linkPopup(data){
            let alert=alertCtrl.create({
                title: `Relier le compte avec :`,
                buttons: [
                    {
                        text: 'Facebook',
                        handler: data => {
                            firebase.auth().currentUser.linkWithRedirect(providerFacebook);
                            
                        
                        
                        }
                    },
                    {
                        text: 'Google',
                        handler: data => {
                            firebase.auth().currentUser.linkWithRedirect(providerGoogle);
                        }
                    },
                    {
                        text: 'Aucun',
                        role: 'cancel'

                    }
                ]
            });
            alert.present();
        }*/




        if(this.civility && this.name && this.surname && this.postalCode && this.town && this.country && this.phone && this.mail && this.title) {


            if (!this.postalCode.match(/^\d{5}$/)) window.alert("Code Postal Invalide")
            else if (!(this.pays.indexOf(this.country.toUpperCase())> -1 )) window.alert("Nom de pays Invalide")
            else if (!this.phone.match(/^\d{10}$/)) window.alert("Numéro de téléphone Invalide")
            else if (!this.mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) window.alert("Adresse Mail Invalide")
            else if (this.password.length<6) window.alert("Mot de passe trop court")
            else {
                
                var navCtrl = this.navCtrl;
                var  workersMailsRef = this. workersMailsRef;
                var  workersRef = this. workersRef;
                var  workersPhonesRef = this. workersPhonesRef;
                var providerGoogle = new firebase.auth.GoogleAuthProvider();
                var providerFacebook = new firebase.auth.FacebookAuthProvider();
                var workersStoreRef = this.workersStoreRef;
                
                if(this.file){
                    var photoRef = workersStoreRef.child(this.name+"_"+this.surname).child(file.name);
                    var uploadPhoto = photoRef.put(file).then((snapshot) =>{
                        this.url = snapshot.downloadURL;
                    });
                } else {
                    /*this.file=new File(["generic-user"],"../assets/imgs/generic-user.png",{type: "image/png"});
                    file=this.file;
                    photoRef = photosRef.child(this.name+"_"+this.surname).child("generic-user.png");
                    uploadPhoto = photoRef.put(file).then((snapshot) =>{
                        this.url = snapshot.downloadURL;
                    });*/
                    this.url = '../assets/imgs/generic-user.png';
                }


                /*var data = {
                    civility: this.civility,
                    name: this.name,
                    surname: this.surname,
                    postalCode: this.postalCode,
                    town: this.town,
                    country: this.country,
                    phone: this.phone,
                    mail: this.mail,
                    text: this.text,
                    
                    
                    password: this.password,
                    role: 'Agent Immobilier',
                   
                }*/
                presentLoadingCustom();
                setTimeout(() => {
                /*var downloadURL = photoRef.getDownloadURL().then(function(url) {
                    console.log(url);
                   
                    
                });
                */

                var data = {
                    civility: this.civility,
                    name: this.name,
                    surname: this.surname,
                    postalCode: this.postalCode,
                    town: this.town,
                    country: this.country,
                    phone: this.phone,
                    mail: this.mail,
                    
                    photoURL: this.url,
                    titre: this.title,
                    text: " ",
                    id: this.name+" "+this.surname,
                    password: this.password,
                    role: 'collaborateur',
                   
                }
                
                console.log(data.photoURL, this.url, this.file, file);
                
                if (data) {
    
                    this. workersPhonesRef.child(data.phone).set(data.name+" "+data.surname, function (error) {
                        if (error){
                            if(file) var deletePhoto = photoRef.delete();
                            window.alert("Un compte avec ce numéro de téléphone ou ce nom d'utilisateur existe déjà");
                        } else {
                            var dotMail=data.mail.replace(/\./g,"_dot_");
                            workersMailsRef.child(dotMail).set(data.name+" "+data.surname, function (error) {
                                if (error){
                                    if(file)var deletePhoto = photoRef.delete();
                                    workersPhonesRef.child(data.phone).set(null);
                                    window.alert("Un compte utilisant cette adresse mail ou ce nom d'utilisateur existe déjà");
                                } else {
                                    workersRef.child(data.name+" "+data.surname).set(data, function (error) {
                                        if (error) {
                                            if(file)var deletePhoto = photoRef.delete();
                                            var dotMail=data.mail.replace(/\./g,"_dot_");
                                            workersMailsRef.child(dotMail).set(null);
                                            workersPhonesRef.child(data.phone).set(null);
                                            window.alert("ID Parrain Inexistant");
                                        } else {
                                            secondaryApp.auth().createUserWithEmailAndPassword(data.mail, data.password).then(function(userRecord) {
                                            window.alert("Création de compte reussie: "+data.name+" "+data.surname);
                                               // secondaryApp.auth().signOut();
                                            finalLoadingCustom();
                                            
                                            setTimeout(() => {
                                            var user2 = secondaryApp.auth().currentUser;
                                            user2.updateProfile({
                                                    
                                                displayName: data.id,
                                                photoURL: '../assets/imgs/generic-user.png',
                                            })
                                            var user = secondaryApp.auth().currentUser;
                                            console.log("userUID"+user.uid);
                                            workersRef.child(data.name+" "+data.surname).update({uid: user.uid});
                                            secondaryApp.auth().signOut();
                                            },5000);
                                            }).catch(function(error) {
                                                if(file)var deletePhoto = photoRef.delete();
                                                workersMailsRef.child(dotMail).set(null);
                                                workersPhonesRef.child(data.phone).set(null);
                                                workersRef.child(data.name+" "+data.surname).set(null);
                                                var errorCode= error.code;
                                                var errorMessage = error.message;
                                                window.alert("Error: "+ errorMessage);
                                            });
                                            /*
                                            admin.auth().createUser({
                                                email: "data.mail",
                                                emailVerified: false,
                                                phoneNumber: data.phone,
                                                password: data.password,
                                                displayName: data.name+" "+data.surname,
                                                photoURL: data.profilePhoto,
                                                disabled: false
                                            }).then(function(userRecord) {
                                                window.alert("Création d'employé reussie: "+userRecord.uid);
                                            }).catch(function(error) {
                                                var errorCode= error.code;
                                                var errorMessage = error.message;
                                                window.alert("Error: "+ errorMessage);
                                            });*/
                                            
                                            //linkPopup(data);
                                            
                                        }
                                    });
                                }
                            })
                        }
                    });
                   

                }
                secondaryApp.delete();
            },5000);
            }
         } else {
             window.alert("Veuillez remplir tout les champs");
         }
    
    }

}