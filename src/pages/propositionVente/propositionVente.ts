import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { VueVentePage } from '../VueVente/VueVente';
import { CreerComptePage } from '../CreerCompte/CreerCompte';
import { NativeStoragePage } from '../native-storage/native-storage';
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
  propositionRef = this.database.ref('proposition');
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
              var propositionRef = this.propositionRef;
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
                  
                  
            

                  
                  this.propositionRef.child(data.id).push(data, function (error) {
                      if (error){
                          window.alert("Impossible d'ajouter cette vente");
                      } 
                      
                      /*else {
                          var dotMail=data.mail.replace(".","_dot_");
                          mailsRef.child(dotMail).set(data.id, function (error) {
                              if (error){
                                  phonesRef.child(data.phone).set(null);
                                  window.alert("Un compte utilisant cette adresse mail ou ce nom d'utilisateur existe déjà");
                              } else {
                                  usersRef.child(data.id).set(data, function (error) {
                                      if (error) {
                                          var dotMail=data.mail.replace(".","_dot_");
                                          mailsRef.child(dotMail).set(null);
                                          phonesRef.child(data.phone).set(null);
                                          window.alert("ID Parrain Inexistant");
                                      } else {
                                          window.alert("Nous allons maintenant effectuer votre première connexion grâce à votre adresse mail et votre mot de passe. \n Vous pourrez ensuite relier votre compte à Facebook ou Google.");
                                          firebase.auth().createUserWithEmailAndPassword(data.mail, data.password).catch(function(error) {
                                              var errorCode= error.code;
                                              var errorMessage = error.message;
                                              window.alert("Error: "+ errorMessage);
                                          });
                                          presentLoadingCustom();
                                          setTimeout(() => {
                                              
                                              firebase.auth().signInWithEmailAndPassword(data.mail, data.password).catch(function(error) {
                                                  var errorCode = error.code;
                                                  var errorMessage = error.message;
                                                  window.alert("Error: "+ errorMessage);
                                                  
                                              });
                                          },5000);
                                          setTimeout(() => {
                                          var user = firebase.auth().currentUser;
                                          console.log("userUID"+user.uid);
                                              usersRef.child(data.id).update({uid: user.uid, photoURL: '../assets/imgs/generic-user.png'});
                                              user.updateProfile({
                                                  
                                                  displayName: data.id,
                                                  photoURL: '../assets/imgs/generic-user.png',
                                              })
                                          },5000);
                                       
                                      }
                                  });
                              }
                          })
                      }*/
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
            
            //window.alert("Informations de vente correctement communiquées à notre collaborateur");
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
    //textarea.style.minHeight  = '0';
     //textarea.style.height     = '0';
    //scroll.setAttribute("height", scrollHeight+20+"px");
    console.log(scrollHeight);
    //$timeout($ionicScrollDelegate.resize, 100);
    /*var scroll_height = textarea.scrollHeight;
    if(scroll_height > 500)
      scroll_height = 500;

   
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";*/
    }
  }

  

  //<ion-label  id="comments" fixed>Commentaires :</ion-label>
