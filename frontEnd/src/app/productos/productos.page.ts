import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../models/productos';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage {
  products:any;
 
  
  nombre: string;
  marca: string;
  descripcion: string;
  color: string;
  precio: string;

  constructor(public productosService: ProductosService) {
    this.productosService.getProducts();
  }
  getProducts() {
    this.productosService.getProducts().then((resp: any) => {
      console.warn(resp);
      this.products = resp.products;
    }).catch((err: any) => {
      console.log(err);
    })
  }

  addProduct() {
    let product = {
      nombre: this.nombre,
      marca: this.marca,
      descripcion: this.descripcion,
      color: this.color,
      precio: this.precio

    }
    this.productosService.registrarProducto(product).then(data => {
      this.nombre = this.marca = this.descripcion = this.color = this.precio = "";
      this.productosService.getProducts()
    })
  }

  deleteProduct(_id) {
    this.productosService.deleteProduct(_id).then(data => {
      this.productosService.getProducts()
    })
  }

}




