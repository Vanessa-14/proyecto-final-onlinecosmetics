import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { Producto } from '../models/productos';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  URL_API = 'http://localhost:3000/producto/';
  products: any;
  constructor(private http: HttpClient) {
    this.products = [];
  }

  getProducts(): Promise<any> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.http.get(this.URL_API).subscribe(res => {
        console.log('respuesta', res);
        this.products = res;
        resolve();
      }, err => {
        console.log('error', err);
        reject();
      });
    });
  }

  registrarProducto(prod: Producto): Promise<any> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.http.post(this.URL_API, prod).subscribe(res => {
        console.log('respuesta', res);
        resolve();
      }, err => {
        console.log('error', err);
        reject();
      })
    })
  }

  putProduct(PROD: Producto): Promise<any> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.http.put(this.URL_API + PROD._id, PROD).subscribe(res => {
        console.log('respuesta', res);
        resolve();
      }, err => {
        console.log('error', err);
        reject();
      })
    })
  }

  deleteProduct(_id: string): Promise<any> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.http.delete(this.URL_API + _id).subscribe(res => {
        console.log('respuesta', res);
        resolve();
      }, err => {
        console.log('error', err);
        reject();
      })
    })
    return;
  }
}
