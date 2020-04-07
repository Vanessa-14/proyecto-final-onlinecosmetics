import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController:AlertController) { }
  email: String;
  password: String;
  async validar(){
    if(this.email == 'vane' && this.password == '123') {
        const alert = await this.alertController.create({
          header: 'Logeado',
          subHeader: 'Bienvenido',
          buttons: ['OK']
        });
    
        await alert.present();
         location.pathname= 'tabs/tab1'
    }else{
      const alert = await this.alertController.create({
        header: 'Contraseña incorrecta y/o campos vacíos',
        message: 'Intenta de nuevo',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

  ngOnInit() {
  }

}
