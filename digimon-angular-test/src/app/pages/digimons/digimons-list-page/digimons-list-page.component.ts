import { Component, OnInit, ViewChild } from '@angular/core';
import { Digimon } from 'src/app/models/digimon';
import { DigimonService } from 'src/app/services/digimons/digimon.service';
import { MatTable } from '@angular/material/table';

const DIGIMONS_DATA: Digimon[] = [
  { name: 'Hydrogen', img: "1.0079", level: 'H' },
  { name: 'Helium', img: "1.0079", level: 'He' },
  { name: 'Lithium', img: "1.0079", level: 'Li' },
  { name: 'Beryllium', img: "1.0079", level: 'Be' },
  { name: 'Boron', img: "1.0079", level: 'B' },
  { name: 'Carbon', img: "1.0079", level: 'C' },
  { name: 'Nitrogen', img: "1.0079", level: 'N' },
  { name: 'Oxygen', img: "1.0079", level: 'O' },
  { name: 'Fluorine', img: "1.0079", level: 'F' },
  { name: 'Neon', img: "1.0079", level: 'Ne' },
];

@Component({
  selector: 'app-digimons-list-page',
  templateUrl: './digimons-list-page.component.html',
  styleUrls: ['./digimons-list-page.component.css']
})
export class DigimonsListPageComponent implements OnInit {

  //Busca por nome
  name: string = "";

  //Tabela de listagem
  displayedColumns: string[] = ['img', 'name', 'level'];
  dataSource: Digimon[] = [];
  @ViewChild(MatTable) table: MatTable<any> | undefined;

  constructor(
    private digimonService: DigimonService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getAllDigimons();
  }

  ngAfterContentInit() {
    this.getAllDigimons();
  }

  async getAllDigimons() {
    try {
      //O subscribe é usado pra recuperar o resultado da requisição
      this.digimonService.getAll().subscribe(dados => {
        this.dataSource = dados as Digimon[];
      });
      this.table?.renderRows();
    } catch (error) {
      // this.snackBar.open('Erro ao buscar todos os Digimons.', 'x');
    }
  }

  search() {
    try {
      //O subscribe é usado pra recuperar o resultado da requisição
      if (this.name !== "") {
        this.digimonService.getByName(this.name).subscribe({
          next: (dados) => {
            this.dataSource = dados;
          },
          error: (err) => {
            console.log('Não foi possível encontrar o Digimon', err);
            this.dataSource = [];
          }
        });
        this.table?.renderRows();
      } else {
        this.getAllDigimons();
      }
    } catch (error) {
      // this.snackBar.open('Erro ao buscar o Digimon pelo nome.', 'x');
    }
  }

}
