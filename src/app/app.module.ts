import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler , MenuController} from 'ionic-angular';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
//import  firebase  from 'firebase';
import { CreateWorkerPage } from '../pages/lm/main/admin/createWorker/createWorker';
import { AdminPage } from '../pages/lm/main/admin/admin';
import { SettingsPage } from '../pages/lm/main/settings/settings';
import { ParrainagePage } from '../pages/lm/main/parrainage/parrainage';
import { MoviesPage } from '../pages/lm/main/movies/movies';
import { AngularFireModule } from 'angularfire2';
//import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AboutPage } from '../pages/about/about';
//import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/lm/login/login';
//import { TabsPage } from '../pages/tabs/tabs';
import { MainPage } from '../pages/lm/main/main';
import { CreerComptePage } from '../pages/lm/login/creerCompte/creerCompte';
//import { NativeStoragePage } from '../pages/native-storage/native-storage';
import { LMPage } from '../pages/lm/lm';
import { EventPage } from '../pages/lm/event/event';
import { PropositionVentePage} from '../pages/lm/main/choixCollaborateur/propositionVente/propositionVente';
import { ChoixCollaborateurPage } from '../pages/lm/main/choixCollaborateur/choixCollaborateur';
import { DashboardPage } from '../pages/lm/main/dashboard/dashboard';
//import { MenuPage } from '../pages/menu/menu';
import { HttpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import firebase from 'firebase'; 
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

//import { OAuthProvider, FirebaseAuth } from '@firebase/auth-types';

var serviceAccount = require('/Users/max/Desktop/MobileProject/testapp/src/app/lmimmobilier-ca1ac-firebase-adminsdk-p1ars-e862321ac1.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lmimmobilier-ca1ac.firebaseio.com"
});




  // Initialize Firebase
  export const config = {
    apiKey: "AIzaSyDiqR_skUnvinHsu92bb6U9AjfMrryFigM",
    authDomain: "lmimmobilier-ca1ac.firebaseapp.com",
    databaseURL: "https://lmimmobilier-ca1ac.firebaseio.com",
    projectId: "lmimmobilier-ca1ac",
    storageBucket: "lmimmobilier-ca1ac.appspot.com",
    messagingSenderId: "782265547191"
  };
  firebase.initializeApp(config);
  //var secondaryApp = firebase.initializeApp(config, "secondary");

@NgModule({
  declarations: [
    MyApp,
    LMPage,
    //AboutPage,
    //ContactPage,
    LoginPage,
    MainPage,
    CreerComptePage,
    //NativeStoragePage,
    PropositionVentePage,
    ChoixCollaborateurPage,
    EventPage,
    AdminPage ,
    SettingsPage ,
    ParrainagePage ,
    MoviesPage,
    DashboardPage ,
    CreateWorkerPage,
    //MenuPage,
    //TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    //AngularFirestore,
    AngularFireModule.initializeApp(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LMPage,
    //AboutPage,
    //ContactPage,
    LoginPage,
    MainPage,
    CreerComptePage,
    //NativeStoragePage,
    PropositionVentePage,
    ChoixCollaborateurPage,
    CreateWorkerPage,
    AdminPage ,
    SettingsPage ,
    ParrainagePage ,
    MoviesPage,
    EventPage,
    DashboardPage ,
    //MenuPage,
    //TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MenuController,
    NativeStorage,
    //OAuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth
  ]
})
export class AppModule {}
