import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  buscarcategoria: String
  categorias: any

  constructor(public service: ServiceService, private router: Router) {
  }
  ngOnInit(){
    this.obtenercategoria();
  }
 
  obtenercategoria(){
   this.service.obtenerCategorias().then((resp: any) =>{
    console.warn(resp);
    this.categorias =  resp.resp
   }).catch((err: any) => {
     console.log(err);
   });

  }
  
  redireccionar(id: any){
    localStorage.setItem('id', id)
     
    
      // this.router.navigate(['/tab2'])
      location.pathname = './tabs/tab2'
  }


}

