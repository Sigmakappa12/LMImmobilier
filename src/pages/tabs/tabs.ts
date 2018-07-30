import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LMPage } from '../lm/lm';
import  firebase  from 'firebase';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LMPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {
    
  }
}
