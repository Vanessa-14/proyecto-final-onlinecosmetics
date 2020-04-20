import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MultiplicacionPipe } from './pipes/multiplicacion.pipe';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './components/usuario/usuario.component';


@NgModule({
  declarations: [AppComponent, MultiplicacionPipe, LoginComponent, UsuarioComponent],
  entryComponents: [],
  imports: [ BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, RouterModule,  Ng2SearchPipeModule, FormsModule ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}





