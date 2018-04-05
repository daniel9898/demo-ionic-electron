import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataBaseTestProvider } from '../../providers/data-base-test/data-base-test';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController ,private dataBase: DataBaseTestProvider) {}



}
