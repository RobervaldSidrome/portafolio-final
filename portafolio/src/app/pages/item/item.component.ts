import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  produto: ProductoDescripcion;
  id: string;

  dia: number = new Date().getDay();
  mes: number =new Date().getMonth();
  ano: number = new Date().getFullYear();

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService ) { }

  ngOnInit() {

    this.route.params
        .subscribe( parametros => {
          // console.log(parametros['id']);
          this.productoService.getProducto(parametros['id'])
                .subscribe( (produto: ProductoDescripcion) => {
                  this.id = parametros['id'];
                  this.produto = produto;
                });
        });


  }

}
