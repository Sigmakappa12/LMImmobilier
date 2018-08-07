import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../../login/login';
import { Facebook } from '@ionic-native/facebook';
import  firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
// Native Component
import { NativeStorage } from '@ionic-native/native-storage';
import { DataSnapshot } from '@firebase/database';
import { MainPage } from '../../main/main';


@Component({
  selector: 'page-creerCompte',
  templateUrl: 'creerCompte.html'
})
export class CreerComptePage {

    parrainID: string;
    civility: string;
    name: string;
    surname: string;
    postalCode: string;
    town: string;
    country: string;
    phone: string;
    mail: string;
    mailConfirm: string;
    id: string;
    database = firebase.database();
    usersRef = this.database.ref('users');
    phonesRef = this.database.ref('phones');
    mailsRef = this.database.ref('mails');
    user = firebase.auth().currentUser;
    users: any;
    test: any;
    checkUsersRef = this.usersRef;
    filters = {};
    filteredUsers = {};
    setTest: any=0;
    pays: any=['ALLEMAGNE','BELGIQUE','FRANCE','ITALIE','LUXEMBOURG'];
    password: any;
    //photoUrl: ../assets/imgs/building2.jpg;



    constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, public alertCtrl: AlertController, private db: AngularFireDatabase, public loadingCtrl: LoadingController) {
       
       /* this.usersRef.orderByChild('ID').on("child_added", this.users=function snap(snapshot) {
            console.log(snapshot.key + "was" + snapshot.val().ID);
            this.test=3;
            return snapshot;
        })*/       
       //console.log("USERS",this.test);
       
       
        // var data= {uid: "user.uid"};
        /*var data = {
      name: "Max",
      score: "43"
    }*/

       // this.usersRef.push(data);
        //console.log("PUSH OK");
    }


    



    





    public storeIdentity(): void {

        this.nativeStorage.setItem('my-identity-card', {parrainID: this.parrainID, civility: this.civility, name: this.name, surname: this.surname, postalCode: this.postalCode, town: this.town, country: this.country, phone: this.phone, mail: this.mail })
        .then(
            () => {
                let alert = this.alertCtrl.create({
                    title: 'Card Saved !', 
                    subTitle: 'It\'s saved my friend!',
                    buttons: ['Nice !']
                });
                alert.present();
            },
            error => console.error('Error Storing item',error)
        
        );


    }


    public showVueVente(){

        
        //parrainID: string ="";
        //var  civility: string;
        //var name: string;
        //var surname: string;
        //var postalCode: number;
        //var town: string;
        //var country: string;
        //var phone: number;
        //var mail: string;
        //var mailConfirm: string;
        //var test=0;
        //var checkUsersRef = this.usersRef;
        //var uid= this.uid;
        //var users;
        //var id;
        //var k;
        //var keys;
        
        //this.checkUsersRef.on('value',gotData);
        
       // console.log("THISUID :",this.checkUsersRef);
        /*
        function gotData(data){
            
            var users=data.val();
            var keys= Object.keys(users);
            //console.log(keys);
            for (var i = 0; i<keys.length;i++){
                i<keys.length;    
                k = keys[i];
                id = users[k].uid;
                //console.log("ID: ",id," UID :", uid, "TEST : ",this.test, "USERSKUID :", users[k].uid);
            }
    
            console.log("VALEUR TEST :",test,"Users :",users);
        
        
        }*/

        var loadingCtrl=this.loadingCtrl;
        var alertCtrl=this.alertCtrl;

        function presentLoadingCustom() {
            let loading = loadingCtrl.create({
              spinner: 'bubbles',
              content: `Création du profil...
                <div class="custom-spinner-container">
                  <div class="custom-spinner-box"></div>
                </div>,`,
              duration: 5000
        
            });
        
            loading.present();
        
        
        
        }
        
        
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




        if(this.parrainID && this.civility && this.name && this.surname && this.postalCode && this.town && this.country && this.phone && this.mail && this.id && this.password) {


            if (!this.postalCode.match(/^\d{5}$/)) window.alert("Code Postal Invalide")
            else if (!(this.pays.indexOf(this.country.toUpperCase())> -1 )) window.alert("Nom de pays Invalide")
            else if (!this.phone.match(/^\d{10}$/)) window.alert("Numéro de téléphone Invalide")
            else if (!this.mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) window.alert("Adresse Mail Invalide")
            else if (this.password.length<6) window.alert("Mot de passe trop court")
            else if (this.mail!=this.mailConfirm){
                window.alert("Erreur dans la vérification du mail")
            } else {


                var navCtrl = this.navCtrl;
                var mailsRef = this.mailsRef;
                var usersRef = this.usersRef;
                var phonesRef = this.phonesRef;
                var providerGoogle = new firebase.auth.GoogleAuthProvider();
                var providerFacebook = new firebase.auth.FacebookAuthProvider();
                


                var data = {
                    parrainID: this.parrainID,
                    civility: this.civility,
                    name: this.name,
                    surname: this.surname,
                    postalCode: this.postalCode,
                    town: this.town,
                    country: this.country,
                    phone: this.phone,
                    mail: this.mail,
                    id: this.id,
                    password: this.password,
                    role: 'user',
                    //uid: user.uid,
                    
                    
                    
                    //photoUrl: url(../assets/imgs/building2.jpg);
                   // mailsRef: this.mailsRef,
                    //usersRef: this.usersRef
                }

                
                
                if (data) {
                    
                    
                   


                    /*this.phonesRef.child(data.phone).set(data.uid)
                    .then(function setMail() {this.mailsRef.child(data.mail).set(data.uid)},function mailKO(){window.alert("Un compte avec ce numéro de téléphone existe déjà")})
                    
                    .then(function setUser() {this.checkUsersRef.child(data.uid).set(data)},function(){window.alert("Un compte utilisant cette adresse mail existe déjà")})
                    .then(function(){},function(){window.alert("Veuillez vérifier l'orthographe de l'ID Parrain")}) 
                      */   



                    
                    this.phonesRef.child(data.phone).set(data.id, function (error) {
                        if (error){
                            window.alert("Un compte avec ce numéro de téléphone ou ce nom d'utilisateur existe déjà");
                        } else {
                            var dotMail=data.mail.replace(/\./g,"_dot_");
                            mailsRef.child(dotMail).set(data.id, function (error) {
                                if (error){
                                    phonesRef.child(data.phone).set(null);
                                    window.alert("Un compte utilisant cette adresse mail ou ce nom d'utilisateur existe déjà");
                                } else {
                                    usersRef.child(data.id).set(data, function (error) {
                                        if (error) {
                                            var dotMail=data.mail.replace(/\./g,"_dot_");
                                            mailsRef.child(dotMail).set(null);
                                            phonesRef.child(data.phone).set(null);
                                            window.alert("ID Parrain Inexistant");
                                        } else {
                                            window.alert("Nous allons maintenant effectuer votre première connexion grâce à votre adresse mail et votre mot de passe. \n Vous pourrez ensuite relier votre compte à Facebook ou Google.");
                                            firebase.auth().createUserWithEmailAndPassword(data.mail, data.password).catch(function(error) {
                                                var errorCode= error.code;
                                                var errorMessage = error.message;
                                                window.alert("Error: "+ errorMessage);
                                                usersRef.child(data.id).set(null);
                                            });
                                            presentLoadingCustom();
                                            /*
                                            setTimeout(() => {
                                                
                                                firebase.auth().signInWithEmailAndPassword(data.mail, data.password).catch(function(error) {
                                                    var errorCode = error.code;
                                                    var errorMessage = error.message;
                                                    window.alert("Error: "+ errorMessage);
                                                    
                                                });
                                            },5000);*/
                                            setTimeout(() => {
                                            var user = firebase.auth().currentUser;
                                            console.log("userUID"+user.uid);
                                                usersRef.child(data.id).update({uid: user.uid, photoURL: '../assets/imgs/generic-user.png'});
                                                user.updateProfile({
                                                    
                                                    displayName: data.id,
                                                    photoURL: '../assets/imgs/generic-user.png',
                                                })
                                            },5000);
                                            /*setTimeout(() => {
                                            linkPopup(data);
                                            },5000);
                                            */
                                            
                                           // firebase.auth().currentUser.linkWithRedirect(providerGoogle);
                                            //firebase.auth().currentUser.linkWithRedirect(providerFacebook);
                                            
                                            
                                            //navCtrl.setRoot(VueVentePage);
                                        }
                                    });
                                }
                            })
                        }
                    });
                   

                    
                     /*   this.mailsRef.child(data.mail).set(data.uid).then(function(mailsRef) {
                            console.log(mailsRef)
        
                        }).catch(function(error) {
                           
                            console.log('failed: '+error);
                            window.alert("Un comte utilisant cette adresse mail existe déjà");
                        });;*/
                     
                    

                    
                   //     this.checkUsersRef.child(data.uid).set(data);
                        /*.then(function(checkUsersRef) {
                            console.log(checkUsersRef)
                        }).catch(function(error) {
                           
                            console.log('failed: '+error);
                            window.alert("Veuillez vérifier l'orthographe de l'ID Parrain");
                        });*/
                    
                    
                    
                    
                    
                    
                    
                    //console.log(data.mail, this.mailsRef, data.uid);
                    
            
                }
            
            }
         } else {
             window.alert("Veuillez remplir tout les champs");
         }
        //this.idList.child(data.uid);
        /*} else {
            window.alert("Identifiant déjà existant ou utilisé!");
        }*/
        //console.log("result",uid);*/
    }



    

    
    public getMyName(): void {
        this.nativeStorage.getItem('my-identity-card')
        .then(
            data => {
                
                this.parrainID = data.parrainID;
                this.civility = data.civility;
                this.name = data.name;
                this.surname = data.surname;
                this.postalCode = data.postalCode;
                this.town = data.town;
                this.country = data.country;
                this.phone = data.phone;
                this.mail = data.mail;
            },
            error => console.error(error)
        );
        
    }

    public showLogin(): void {
    
        //console.log(this.id);
        //console.log(this.password);
        this.navCtrl.push(LoginPage);
      }




}
