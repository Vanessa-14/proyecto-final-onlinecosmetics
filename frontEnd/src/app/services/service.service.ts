import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from '../models/producto';
import { PedidoModel } from '../models/pedido';
import { CategoriaModel } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  url:string = `http://localhost:3000`;

  constructor(private http: HttpClient) { }

  obtenerCategorias() {
    return this.http.get(`${this.url}/categoria`).toPromise();
  }

  obtenerCategoria(id: string) {
    return this.http.get(`${this.url}/categoria/${id}`).toPromise();
  }

  registrarCategoria(categoria: CategoriaModel) {
    return this.http.post(`${this.url}/categoria`, categoria).toPromise();
  }

  actualizarCategoria(id: string, categoria: CategoriaModel) {
    return this.http.put(`${this.url}/categoria/${id}`, categoria).toPromise();
  }

  eliminarCategoria(id: string) {
    return this.http.delete(`${this.url}/categoria/${id}`).toPromise();
  }

  obtenerProductos() {
    return this.http.get(`${this.url}/producto`).toPromise();
  }

  obtenerProducto(id: string) {
    return this.http.get(`${this.url}/producto/${id}`).toPromise();
  }

  registrarProducto(producto: ProductoModel) {
    return this.http.post(`${this.url}/producto`, producto).toPromise();
  }

  actualizarProducto(id: string, producto: ProductoModel) {
    return this.http.put(`${this.url}/producto/${id}`, producto).toPromise();
  }

  eliminarProducto(id: string) {
    return this.http.delete(`${this.url}/producto/${id}`).toPromise();
  }
  obtenerPedidos() {
    return this.http.get(`${this.url}/pedido`).toPromise();
  }

  obtenerPedido(id: string) {
    return this.http.get(`${this.url}/pedido/${id}`).toPromise();
  }

  registrarPedido(pedido: PedidoModel) {
    return this.http.post(`${this.url}/pedido`, pedido).toPromise();
  }

  actualizarPedido(id: string, pedido: PedidoModel) {
    return this.http.put(`${this.url}/pedido/${id}`, pedido).toPromise();
  }

  eliminarPedido(id: string) {
    return this.http.delete(`${this.url}/pedido/${id}`).toPromise();
  }
  
}
