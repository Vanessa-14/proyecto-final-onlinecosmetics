import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  constructor(public alertController: AlertController, private service: UsuarioService, private router :Router) { }


  async error() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario o contraseña incorrectos.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

  login(form: NgForm) {
console.log(this.usuario);
     this.service.login(this.usuario).then((usuario: any) => {
       localStorage.setItem('token', usuario.token);
       window.location.pathname="/tabs";
     }).catch((err: any) => {
      console.log(err);
      this.error();
      form.resetForm();
    });
  }

  registrar() {
    this.router.navigate(['/usuario']);
  }

}

