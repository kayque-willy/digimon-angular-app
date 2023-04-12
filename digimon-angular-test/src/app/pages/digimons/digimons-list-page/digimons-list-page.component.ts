import { Component, OnInit, ViewChild } from '@angular/core';
import { Digimon } from 'src/app/models/digimon';
import { DigimonService } from 'src/app/services/digimons/digimon.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-digimons-list-page',
  templateUrl: './digimons-list-page.component.html',
  styleUrls: ['./digimons-list-page.component.css']
})
export class DigimonsListPageComponent implements OnInit {

  //Controle da exibição da lista
  begin: number = 0;
  end: number = 10;

  //Busca por nome
  name: string = "";

  // Busca por level
  selectLevel: string = "";

  //Tabela de listagem
  displayedColumns: string[] = ['img', 'name', 'level'];
  dataSource: Digimon[] = [];
  dataList: Digimon[] = [];
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

  public onModelChange(value: any) {
    if (this.name === '') {
      this.getAllDigimons();
    }
  }

  public onLevelChange(val: string) {
    this.selectLevel = val;
    console.log("Level: " + this.selectLevel);
    if (this.selectLevel === "") {
      this.getAllDigimons();
    } else {
      this.getDigimonsbyLevel();
    }
  }

  getMoreResults() {
    this.begin += 10;
    this.end += 10;
    const moreResults: Digimon[] = this.dataList.slice(this.begin, this.end);
    this.dataSource.push(...moreResults);
    this.table?.renderRows();
  }

  async getAllDigimons() {
    try {
      this.digimonService.getAll().subscribe(dados => {
        this.dataList = dados as Digimon[];
        this.begin = 0;
        this.end = 10;
        this.dataSource = this.dataList.slice(this.begin, this.end);
      });
      this.table?.renderRows();
    } catch (error) {
      // this.snackBar.open('Erro ao buscar todos os Digimons.', 'x');
    }
  }

  async getDigimonsbyLevel() {
    try {
      this.digimonService.getByLevel(this.selectLevel).subscribe(dados => {
        this.dataList = dados as Digimon[];
        this.begin = 0;
        this.end = 10;
        this.dataSource = this.dataList.slice(this.begin, this.end);
      });
      this.table?.renderRows();
    } catch (error) {
      // this.snackBar.open('Erro ao buscar todos os Digimons.', 'x');
    }
  }

  searchByName() {
    try {
      //O subscribe é usado pra recuperar o resultado da requisição
      if (this.name !== "") {
        this.digimonService.getByName(this.name).subscribe({
          next: (dados) => {
            this.dataList = dados as Digimon[];
            this.begin = 0;
            this.end = 10;
            this.dataSource = this.dataList.slice(this.begin, this.end);
          },
          error: (err) => {
            console.log('Não foi possível encontrar o Digimon', err);
            this.dataList = [];
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
