import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { MainPage } from '../../main/main';
import { CreerComptePage } from '../../login/creerCompte/creerCompte';
import { PropositionVentePage } from '../../main/choixCollaborateur/propositionVente/propositionVente';
import  firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import * as $ from 'jquery';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  database = firebase.database();
  workersRef = this.database.ref('workers');
  phonesRef = this.database.ref('phones');
  mailsRef = this.database.ref('mails');
  user = firebase.auth().currentUser;
  storage = firebase.storage();
  storageRef = this.storage.ref();
  imagesRef = this.storageRef.child('Collaborateurs/Photos');
  lioPhotoRef = this.imagesRef.child('lio1.JPG');
  url = this.lioPhotoRef.getDownloadURL();
  imgsource;

  constructor(public navCtrl: NavController, public zone: NgZone, public loadingCtrl: LoadingController) {
    this.presentLoadingCustom();
    
    this.afficherImage();
   /* setTimeout(() => {
     document.getElementById("lio").style.display = "block";
      },5000);*/
  }

  
  public showPropositionVente(id) {
    
    //console.log(this.id);
    //console.log(this.password);
    this.navCtrl.push(PropositionVentePage,{id: id});


  }

  



  public afficherImage(){
    var navCtrl=this.navCtrl;
    var workersRef=this.workersRef;
    var lioPhotoRef=this.imagesRef.child('lio1.JPG');
    function br() {
      return document.createElement('br');
    }

  
    lioPhotoRef.getDownloadURL().then(function(url) {
      console.log(url);
    
    workersRef.once('value').then(function(snapshot) {
      let postObject = snapshot.val();
      let keys = Object.keys(postObject);

      for (var i=0; i<keys.length;i++) {
        let currentRow;
        let currentObject = postObject[keys[i]];
        //if (i%1 ==0) {
          currentRow = document.createElement("ion-button");
          currentRow.setAttribute("id",currentObject.id);
          //var push = navCtrl.push(PropositionVentePage,{id: currentObject.id});
          
          //currentRow.set;
          $(currentRow).addClass("rowButton");
          $("#contentHolder").append(currentRow);
          //$("#contentHolder").add('<ion-button id="'+currentObject.id+'" (tap) = "buttonTap()"></ion-button>').appendTo("#contentHolder");
          document.getElementById(currentObject.id).addEventListener ("click", function() {
            console.log(document.getElementById(currentObject.id));
            navCtrl.push(PropositionVentePage,{id: currentObject.id});
          });
         // currentRow.setAttribute
        //}
        
      let col=document.createElement("div");
      $(col).addClass("choixDiv");
      
      //$("#contentHolder").append(col);
      //console.log(i);
      //workersRef.child('LIO').update({ photoURL: url});
      var img=document.createElement("img");
      //var row=document.createElement("ion-row");
      //var icon=document.createElement("ion-icon");
      //$(icon).addClass("myIcon");
      //icon.setAttribute("name", "arrow-forward");
      //$(row).addClass("littleRow");
      $(img).addClass("contentImg");
      img.src=currentObject.photoURL;
      
   
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
      //$(lab).addClass("justify-content-start");
      lab.setAttribute("align","justify");
      //lab.innerHTML = "Here goes the text";
      lab.appendChild(id);
      lab.appendChild(br());
      lab.appendChild(role);
      lab.appendChild(br());
      lab.appendChild(br());
      lab.appendChild(h);
      //lab.appendChild(br());
      //$(currentRow).append(icon);
      //currentRow.appendChild(img);
        //$(col).append(p);
      $(col).append(img);
      $(col).append(lab);
      //$("#contentHolder").append(icon);
      
      $(currentRow).append(col);
      //  $(col).append(row);
      
      }

      console.log("sortieloadbutton");
      
      /*for (var j=0; j<keys.length;j++) {
        
        var currentObj = postObject[keys[j]];
        console.log(document.getElementById(currentObj.id));
        document.getElementById(currentObj.id).addEventListener ("click", function() {
          
          console.log(document.getElementById(currentObj.id));
          navCtrl.push(PropositionVentePage,{id: currentObj.id});
        });
  
      }*/

    })
    
      /*user.updateProfile({
          
          displayName: data.id,
          photoURL: '../assets/imgs/generic-user.png',
      })*/



      //document.querySelector('img').src= url;
    })
    
    //console.log(this.imgsource);
    /*this.zone.run(() => {
      this.imgsource = url;
    });*/
    
  }

  private presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Chargement...\n
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 3800

    });

    loading.present();



    }


    public buttonTap(){
      //navCtrl.push(PropositionVentePage,{id: currentObject.id})
    }




}


/*
<ion-footer text-center>

<button id="validButton" ion-button round (tap) = "showPropositionVente()" >Selectionner</button>

</ion-footer>
*/




/*$(element)
        .on('touchstart', function () {
            $(this).data('moved', '0');
        })
        .on('touchmove', function () {
            $(this).data('moved', '1');
        })
        .on('touchend', function () {
            if($(this).data('moved') == 0){
                // HERE YOUR CODE TO EXECUTE ON TAP-EVENT
            }
        });*/