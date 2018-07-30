import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// Native Component
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
    selector: 'page-native-storage',
    templateUrl: 'native-storage.html'

})
export class NativeStoragePage {


    name: string;
    surname: string;
    years: number;




    constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, public alertCtrl: AlertController) {

    }

    public storeIdentity(): void {

        this.nativeStorage.setItem('my-identity-card', {name: this.name, surname: this.surname, years: this.years })
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

    public getMyName(): void {
        this.nativeStorage.getItem('my-identity-card')
        .then(
            data => {
                this.name = data.name;
                this.surname = data.surname;
                this.years = data.years;
            },
            error => console.error(error)
        );
    }



}