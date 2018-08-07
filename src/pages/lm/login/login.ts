import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { LMPage } from '../../lm/lm';
import { CreerComptePage } from './creerCompte/creerCompte';
//import { NativeStoragePage } from '../native-storage/native-storage';
import { Facebook } from '@ionic-native/facebook';
import  firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
//import { Router } from "@angular/router";
import { User } from '../../../app/user';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  userEmail: string;
  id: any;
  password: any;
  arrData: any[];
  userPass: any;
  user = firebase.auth().currentUser;
  userInfo: any= {};
  use: BehaviorSubject<User>
    
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase, private navParams: NavParams) {
    
    
    
    
   
    /*this.fdb.list('/myItems/').valueChanges().subscribe(_data => {
      this.arrData = _data;
      //this.logOut();
      //var provider = new firebase.auth.FacebookAuthProvider();
      
      
     /* const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          console.log("NO USER");
         this.navCtrl.push(LMPage);
        } else {
          console.log("USER");
          //this.rootPage = HomePage;
          this.navCtrl.setRoot(VueVentePage, {
            id: this.id, 
            password: this.password, 
            user: this.user
          });
          
        }
      });*/
    /*});*/
  }


  logInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }



  logInWithFb(){
      
    var provider = new firebase.auth.FacebookAuthProvider();
    //firebase.auth().signInWithRedirect(provider);
    /*firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      
      this.setRoot(VueVentePage, {
        id: this.id, 
        password: this.password 
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });*/
      

    
    // Start a sign in process for an unauthenticated user.
    //var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    //firebase.auth().signInWithRedirect(provider);
    //this.navCtrl.setRoot(VueVentePage);
    //this.id=this.user.email;
    //this.password=this.user.email;
    
  }





  public showVueVente() {
    //this.userEmail = document.getElementById("email_field");
    //var userPass = document.getElementById("password_field");
    //this.userEmail = this.id;
    //this.userPass = this.password;
    
    //this.updateHTML('mailInput',this.userEmail);
    //this.updateHTML('passwordInput',this.userPass);
    
    
    this.navCtrl.setRoot(MainPage, {
      id: this.id, 
      password: this.password 
    });
    
    //this.userEmail = document.getElementById("mailInput");
    //this.userPass = document.getElementById("passwordInput");
    //firebase.auth().onAuthStateChanged(function(user){
      //if (user) {
         //SIGNED IN
        /*this.navCtrl.setRoot(VueVentePage, {
          id: this.id, 
          password: this.password 
          });*/
       //console.log("CONNECTE OK");
     // } else {
        //No SIGNED IN
        /*firebase.auth().signInWithEmailAndPassword(this.userEmail, this.userPass).catch(function(error) 
        {   var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error: "+ errorMessage);
        
        });*/
      //}
   // });
    /*
    firebase.auth().signInWithEmailAndPassword(this.userEmail, this.userPass).catch(function(error) 
    {   var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: "+ errorMessage);
        
    });*/
    
    
      {
        //console.log(this.id);
        //console.log(this.password);
       // this.navCtrl.setRoot(VueVentePage, {
        //id: this.id, 
        //password: this.password 
        //});
     // } else {
      //  window.alert("Error:");
      }
  
      
         
      
  }
  /*public listen(){
    firebase.auth().onAuthStateChanged(function(user){  
    if (user) {
       //SIGNED IN
      
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
       
       
       //this.navCtrl.setRoot(VueVentePage, {
        //id: this.id, 
        //password: this.password 
        //});
        //this.showCreerCompte();
        
        /*this.setRoot(VueVentePage, {
          id: this.id, 
          password: this.password 
        });
     console.log("CONNECTE OK", user);
    } else {
      //No SIGNED IN
      /*firebase.auth().signInWithEmailAndPassword(this.userEmail, this.userPass).catch(function(error) 
      {   var errorCode = error.code;
          var errorMessage = error.message;
          window.alert("Error: "+ errorMessage);
      
      });
      //console.log("CONNECTE NON");
    //}
    //})
  }*/

  public showCreerCompte() {
/*
    firebase.auth().createUserWithEmailAndPassword(this.userEmail, this.userPass).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: "+ errorMessage);
    })
  */  
    //console.log(this.id);
    //console.log(this.password);
    this.navCtrl.push(CreerComptePage, {
      id: this.id, 
      password: this.password 
    });


  }

  public logIn(){
    
    //this.updateHTML(this.id,this.userEmail);
    //this.updateHTML('passwordInput',this.userPass);
    //console.log(this.userEmail,this.userPass);
    //this.userEmail = document.getElementById('mailInput');
    //this.userPass = document.getElementById('passwordInput');
    
    firebase.auth().signInWithEmailAndPassword(this.id, this.password).catch(function(error) 
    {   var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: "+ errorMessage);
        
    });
/*
    if (this.user){
    this.user.updateProfile({
      displayName: "Maxime",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
    
    }*/


/*
    firebase.auth().onAuthStateChanged(function(user){  
      if (user) {
         //SIGNED IN
        
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
         
         
         //this.navCtrl.setRoot(VueVentePage, {
          //id: this.id, 
          //password: this.password 
          //});
          //this.showCreerCompte();
          
          /*this.setRoot(VueVentePage, {
            id: this.id, 
            password: this.password 
          });*/
       //console.log("CONNECTE OK", user);
      //} else {
        //No SIGNED IN
        /*firebase.auth().signInWithEmailAndPassword(this.userEmail, this.userPass).catch(function(error) 
        {   var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error: "+ errorMessage);
        
        });*/
        //console.log("CONNECTE NON");
      //}
      
      

      //});
      console.log("FIN LOGIN");
     
    
    
    
    
    }


    
  



  public logOut(){
    firebase.auth().signOut().then(function() {
      //Sign out success.
    }).catch(function(error) {
      //An Error.
    });
  }




  /*public showNativeStorage() {
    
    //console.log(this.id);
    //console.log(this.password);
    this.navCtrl.push(NativeStoragePage, {
      nom: this.id, 
      password: this.password 
    });


  }*/

  
  /*public updateHTML(elmId, value) {
    var elem = document.getElementById(elmId);
    if(typeof elem !== 'undefined' && elem !== null) {
      value = document.getElementById(elmId);
    }
  
    console.log("Elem: ",elem, "elmID: ",elmId,"value: " ,value);
  }
*/




  

}
