import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler , MenuController} from 'ionic-angular';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
//import  firebase  from 'firebase';
import { AdminPage } from '../pages/admin/admin';
import { SettingsPage } from '../pages/settings/settings';
import { ParrainagePage } from '../pages/parrainage/parrainage';
import { MoviesPage } from '../pages/movies/movies';
import { AngularFireModule } from 'angularfire2';
//import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { VueVentePage } from '../pages/VueVente/VueVente';
import { CreerComptePage } from '../pages/CreerCompte/CreerCompte';
import { NativeStoragePage } from '../pages/native-storage/native-storage';
import { LMPage } from '../pages/lm/lm';
import { EventPage } from '../pages/event/event';
import { PropositionVentePage} from '../pages/propositionVente/propositionVente';
import { ChoixCollaborateurPage } from '../pages/choixCollaborateur/choixCollaborateur';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MenuPage } from '../pages/menu/menu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import firebase from 'firebase'; 
//import { OAuthProvider, FirebaseAuth } from '@firebase/auth-types';



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

@NgModule({
  declarations: [
    MyApp,
    LMPage,
    AboutPage,
    ContactPage,
    LoginPage,
    VueVentePage,
    CreerComptePage,
    NativeStoragePage,
    PropositionVentePage,
    ChoixCollaborateurPage,
    EventPage,
    AdminPage ,
    SettingsPage ,
    ParrainagePage ,
    MoviesPage,
    DashboardPage ,
    MenuPage,
    TabsPage
  ],
  imports: [
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
    AboutPage,
    ContactPage,
    LoginPage,
    VueVentePage,
    CreerComptePage,
    NativeStoragePage,
    PropositionVentePage,
    ChoixCollaborateurPage,
    AdminPage ,
    SettingsPage ,
    ParrainagePage ,
    MoviesPage,
    EventPage,
    DashboardPage ,
    MenuPage,
    TabsPage
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
