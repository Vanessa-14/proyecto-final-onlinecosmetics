import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';


const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children:[
      {
        path:'usuario',
        redirectTo: '/usuario'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRotuingModule  {}