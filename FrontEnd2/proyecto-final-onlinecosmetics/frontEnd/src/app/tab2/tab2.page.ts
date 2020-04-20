import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  categorias: any
  productos: any

  constructor( public service: ServiceService, private router: Router) {}
  ngOnInit(){
    this.obtenerporId();
    this.obtener();
  }
  obtenerporId(){
    let id = localStorage.getItem('id');
    this.service.obtenerCategoria(id).then((resp: any) =>{
     console.warn(resp);
     this.categorias =  resp.categorias
     console.log(this.categorias)
    }).catch((err: any) => {
      console.log(err);
    });
   }

   obtener( ){
   let id = localStorage.getItem('id');
   this.service.obtenerProducto(id).then((resp: any) =>{
    console.warn(resp);
    this.productos =  resp.productos
   }).catch((err: any) => {
     console.log(err);
   });
  }
  redireccionar(id: any){
    localStorage.setItem('id', id)
      location.pathname = './tabs/tab3'
  }
  guardar(idproducto: any){
    localStorage.setItem('idproducto', idproducto)

  }
  
 
   

}
