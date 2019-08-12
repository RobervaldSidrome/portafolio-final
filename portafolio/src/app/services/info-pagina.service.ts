import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  carrega = false;

  equipe: any[] = [];

  constructor( private http: HttpClient ) {

    this.carregaInfo();
    this.carregaEquipe();

  }

  private carregaInfo() {
    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {
      this.carrega = true;
      this.info = resp;
    });
  }


  private carregaEquipe() {

    // Leer el archivo JSON
    //this.http.get('https://angular-html-25cf9.firebaseio.com/equipo.json')
    this.http.get('https://digital-marketing-91e6a.firebaseio.com/equipe.json')
    .subscribe( (resp: any[]) => {

      this.equipe = resp;
      // console.log(resp);
    });


    // this.equipo = resp
  }

}



