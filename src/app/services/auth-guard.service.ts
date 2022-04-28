import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { RegisterPageModule } from '../register/register.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  authState = new BehaviorSubject(false);

  constructor(

  ) { 

  }


}
