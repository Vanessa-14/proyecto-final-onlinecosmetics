import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";;
import { Usuario } from '../models/usuario';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private url: string = 'http://localhost:3000/'

    constructor(private http: HttpClient) { }

    login(usuario: Usuario) {
        return this.http.post(this.url + 'login', usuario).toPromise();
    }

    registrarUsuario(usuario: Usuario) {
        return this.http.post(`${this.url}registrar`, usuario).toPromise();
    }
    actualizar(id,usuario : Usuario){
        return this.http.put(`${this.url}actualizar/${id}`,usuario).toPromise();
    }
    obtenerId(id){
       return this.http.get(`${this.url}obtener/${id}`).toPromise();
    }
}