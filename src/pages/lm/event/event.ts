import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { CreerComptePage } from '../../lm/login/creerCompte/CreerCompte';
//import { NativeStoragePage } from '../native-storage/native-storage';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-Event',
  templateUrl: 'Event.html'
})
export class EventPage {

  constructor(public navCtrl: NavController) {
    
  }



  public showOurEvent(): void {
    
    //console.log(this.id);
    //console.log(this.password);
    //this.navCtrl.push(HomePage);
  }



  public showCreateEvent(): void {
    
    //console.log(this.id);
    //console.log(this.password);
    //this.navCtrl.push(HomePage);
  }



}
