import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NavController, ViewController, AlertController, IonicPage, NavParams , MenuController, Nav} from 'ionic-angular';
import { VueVentePage } from '../VueVente/VueVente';
import { CreerComptePage } from '../CreerCompte/CreerCompte';
import { NativeStoragePage } from '../native-storage/native-storage';

export interface PageInterface {
    title: string;
    pageName: string;
    tabComponent?: any;
    index?: number;
    icon: string;
}


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

   // rootPage='VueVentePage';
//@ViewChild(Nav) nav: Nav;
  

    

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    
 
}

}
