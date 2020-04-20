import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {


  usuario: Usuario = new Usuario();
  constructor(public alertController: AlertController, private usuarioService: UsuarioService, private router: Router) { }

  async registroExitoso() {
    const alert = await this.alertController.create({
      header: 'Bienvenido!',
      message: 'El usuario se ha creado con éxito',
      buttons: [
        {
          text: '¡Iniciar sesión!',
          handler: () => {
            this.router.navigate(['/']);
          }
        }
      ]
    });
    await alert.present();
  }

  async registroFallido() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El usuario no se ha podido registrar',
      buttons: ['OK'],

    });
    await alert.present();
  }

  ngOnInit() {

  }

  return() {
    this.router.navigate(['/']);
  }

  registrarUsuario(forma: NgForm) {
    this.usuarioService.registrarUsuario(this.usuario).then((resp: any) => {
      this.registroExitoso();
    }).catch((err) => {
      console.log(err);
      this.registroFallido();
    });

  }

}

