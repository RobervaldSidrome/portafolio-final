import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from '../../../node_modules/@types/q';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  carrega = true;
  produtos: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor( private http: HttpClient ) {

    this.carregarProdutos();

  }


  private carregarProdutos() {

    return new Promise(  ( resolve, reject ) => {

      this.http.get('https://digital-marketing-91e6a.firebaseio.com/produtos_idx.json')
          .subscribe( (resp: Producto[]) => {
            this.produtos = resp;
            this.carrega = false;
            resolve();
          });
 
    });

  }

  getProducto( id: string ) {

    return this.http.get(`https://digital-marketing-91e6a.firebaseio.com/produtos/${ id }.json`);

  }

  buscarProducto( termino: string ) {


    if ( this.produtos.length === 0 ) {
      // cargar productos
      this.carregarProdutos().then( () => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }


  }

  private filtrarProductos( termino: string ) {

    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.produtos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0  ) {
        this.productosFiltrado.push( prod );
      }

    });


  }

}
