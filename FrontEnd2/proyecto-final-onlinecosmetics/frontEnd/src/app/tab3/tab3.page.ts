import { Component, EventEmitter, Output } from '@angular/core';
import { ServiceService } from '../services/service.service';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  usuario:string;
  producto:string;
  cantidad: string;
  productos: any
  pedidos: any


  constructor(public service: ServiceService) {
    this.service.obtenerPedidos();
  }
  ngOnInit(){
    this.obtenerproductos();
    this.obtenerpedidos();
  }
 
  obtenerproductos(){
   this.service.obtenerProductos().then((resp: any) =>{
    console.warn(resp);
    this.productos =  resp.productos
    this.ngOnInit();
   }).catch((err: any) => {
     console.log(err);
   });

  }
  obtenerpedidos(){
    this.service.obtenerPedidos().then((resp: any) =>{
     console.warn(resp);
     this.pedidos =  resp.pedidos
     this.ngOnInit();
    }).catch((err: any) => {
      console.log(err);
    });
 
   }
   addPedido(){
    let pedido ={
      usuario:this.usuario,
      producto:this.producto,
      cantidad:this.cantidad

    }
    console.log(pedido)
    this.service.registrarPedido(pedido).then(data=>{
      this.usuario = this.producto = this.cantidad="";
      this.service.obtenerPedidos()
      console.log(data)

    })
    .catch((err) =>{
      console.log(err);
    })
  }

  deletePedido(_id){
    this.service.eliminarPedido(_id).then(data=>{
      this.service.obtenerPedidos()
    })
  }

}

  // registrar() {
  //   this.service.registrarPedido(this.pedidos).then((resp: any) => {
  //     console.warn(resp);
  //     this.pedidos =  resp.pedidos
  //   }).catch((err: any) => {
  //     console.log(err);
     
  //   });
  // }
  // deletePedido(_id){
  //   this.service.eliminarPedido(_id).then((resp: any) => {
  //     console.warn(resp);
  //     this.pedidos =  resp.pedidos
  //     this.service.obtenerPedidos()
  //   })
  // }



