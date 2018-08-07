import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { MainPage } from '../../../main/main';
import { CreerComptePage } from '../../../login/creerCompte/creerCompte';
//import { NativeStoragePage } from '../native-storage/native-storage';
import  firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-propositionVente',
  templateUrl: 'propositionVente.html'
})
export class PropositionVentePage {


  surname: string;
  name: string;
  mail: string;
  adress: string;
  town: string;
  country: string;
  phone: string;
  comments: string;
  id: string;
  worker: string;
  password: string;
  postalCode: string;
  database = firebase.database();
  usersRef = this.database.ref('users');
  toSellRef = this.database.ref('toSell');
  //mailsRef = this.database.ref('mails');
  user = firebase.auth().currentUser;
  users: any;
  test: any;
  checkUsersRef = this.usersRef;
  filters = {};
  filteredUsers = {};
  setTest: any=0;
  pays: any=['ALLEMAGNE','BELGIQUE','FRANCE','ITALIE','LUXEMBOURG'];


  constructor(public navCtrl: NavController,public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
    this.worker=navParams.get("id");
   console.log(this.worker);

  }
  
  
  
  private fillMe() {
    
  }
  
 
 
  private sell() {
    
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
        
        if(this.surname && this.name && this.postalCode && this.town && this.country && this.adress && this.phone && this.mail) {


          if (!this.postalCode.match(/^\d{5}$/)) window.alert("Code Postal Invalide")
          else if (!(this.pays.indexOf(this.country.toUpperCase())> -1 )) window.alert("Nom de pays Invalide")
          else if (!this.phone.match(/^\d{10}$/)) window.alert("Numéro de téléphone Invalide")
          else if (!this.mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) window.alert("Adresse Mail Invalide")
          else {


              var navCtrl = this.navCtrl;
              var toSellRef = this.toSellRef;
              var usersRef = this.usersRef;
              
              var providerGoogle = new firebase.auth.GoogleAuthProvider();
              var providerFacebook = new firebase.auth.FacebookAuthProvider();
              


              var data = {
                  name: this.name,
                  surname: this.surname,
                  postalCode: this.postalCode,
                  town: this.town,
                  country: this.country,
                  phone: this.phone,
                  mail: this.mail,
                  id: this.user.displayName,
                  worker: this.worker,
                 
                  adress: this.adress
                  
                
              }

              
              
              if (data) {
                  
                  
            
                this.database.ref('sold').push(data);
                this.database.ref('sales').push(data);
                toSellRef.push(data, function (error) {
                    if (error){
                        window.alert("Impossible d'ajouter cette vente");
                    } 
                    
                    
                });
                 

                  
                 
          
              }
          
            }
            let alert=alertCtrl.create({
                    title: `Informations de vente correctement communiquées à notre collaborateur, elle sera visible après validation et vérification.`,
                    buttons: [
                        {
                            text: 'Quitter',
                            handler: data => {
                                this.navCtrl.popToRoot();
                            }
                        }
                        
                    ]
                });
                alert.present();
            
          
       } else {
           window.alert("Veuillez remplir tout les champs");
           console.log(this.town,this.surname,this.name,this.postalCode,this.phone,this.adress,this.mail);
       }
     
  }

  public change() {
   
    var element   = document.getElementById('messageInputBox');
    var textarea  = element.getElementsByTagName('textarea')[0];
    //var comments = document.getElementsByClassName("comments");
    var scroll = document.getElementById('scroll');
    var scrollHeight= scroll.getAttribute("height"); 
   
    console.log(scrollHeight);
  
    }
  }