import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplicacion'
})
export class MultiplicacionPipe implements PipeTransform {

  transform(cantidad: number, precio: string): number {
    let pre = parseFloat(precio);
    let multi = (cantidad*pre);
    return multi;
  
   }

}
