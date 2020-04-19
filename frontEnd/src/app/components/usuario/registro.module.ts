import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioComponent } from './usuario.component';
import { RegistroPageRotuingModule } from './registro-routing-module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRotuingModule

  ],
  declarations: [UsuarioComponent],

})
export class UsuarioModule { }
