import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { VueVentePage } from '../VueVente/VueVente';
import { CreerComptePage } from '../CreerCompte/CreerCompte';
import { NativeStoragePage } from '../native-storage/native-storage';

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
