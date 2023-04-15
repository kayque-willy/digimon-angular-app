import { Component, OnInit, ViewChild } from '@angular/core';
import { Digimon } from 'src/app/models/digimon';
import { DigimonService } from 'src/app/services/digimons/digimon.service';
import { MatTable } from '@angular/material/table';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-digimons-list-page',
  templateUrl: './digimons-list-page.component.html',
  styleUrls: ['./digimons-list-page.component.css']
})
export class DigimonsListPageComponent implements OnInit {

  // Controle da exibição da lista
  begin: number = 0;
  end: number = 10;
  showBtn: boolean = true;
  showLoad: boolean = true;
  showNotfound: boolean = false;

  // Busca por nome
  name: string = "";

  // Busca por level
  selectLevel: string = "";

  // Listas de dados
  dataSource: Digimon[] = [];
  dataList: Digimon[] = [];

  // Tabela de listagem
  displayedColumns: string[] = ['img', 'name', 'level'];
  @ViewChild(MatTable) table: MatTable<any> | undefined;

  constructor(
    private digimonService: DigimonService,
    private scroller: ViewportScroller
  ) { }

  async ngOnInit(): Promise<void> {
    this.getAllDigimons();
  }

  ngAfterContentInit() {
    this.getAllDigimons();
  }

  public onModelChange() {
    if (this.name === '') {
      this.showNotfound = false;
      this.dataSource = [];
      this.getAllDigimons();
    }
  }

  public onLevelChange(val: string) {
    this.selectLevel = val;
    this.showNotfound = false;
    if (this.selectLevel === "") {
      this.getAllDigimons();
    } else {
      this.getDigimonsbyLevel();
    }
  }

  getMoreResults() {
    this.showLoad = true;
    this.begin += 10;
    this.end += 10;
    const moreResults: Digimon[] = this.dataList.slice(this.begin, this.end);
    setTimeout(() => {
      this.dataSource.push(...moreResults);
      this.end > this.dataList.length ? this.showBtn = false : this.showBtn = true;
      this.showLoad = false;
      this.table?.renderRows();
      this.scroller.scrollToAnchor("anchor-footer");
    }, 300);
  }

  //Métodos que fazem comunicação com a API
  async getAllDigimons() {
    try {
      this.showLoad = true;
      this.showBtn = false;
      this.dataSource = [];
      this.digimonService.getAll().subscribe(dados => {
        this.dataList = dados as Digimon[];
        this.begin = 0;
        this.end = 10;
        this.dataSource = this.dataList.slice(this.begin, this.end);
        this.end > this.dataList.length ? this.showBtn = false : this.showBtn = true;
        this.showLoad = false;
      });
      this.table?.renderRows();
    } catch (error) {
      console.error(error);
      // this.snackBar.open('Erro ao buscar todos os Digimons.', 'x');
    }
  }

  async getDigimonsbyLevel() {
    try {
      this.showLoad = true;
      this.showBtn = false;
      this.dataSource = [];
      this.scroller.scrollToAnchor("anchor-title");
      this.digimonService.getByLevel(this.selectLevel).subscribe(dados => {
        this.dataList = dados as Digimon[];
        this.begin = 0;
        this.end = 10;
        this.dataSource = this.dataList.slice(this.begin, this.end);
        this.end > this.dataList.length ? this.showBtn = false : this.showBtn = true;
        this.showLoad = false;
      });
      this.table?.renderRows();
    } catch (error) {
      console.error(error);
      // this.snackBar.open('Erro ao buscar todos os Digimons.', 'x');
    }
  }

  async searchByName() {
    try {
      this.showLoad = true;
      this.showBtn = false;
      this.dataSource = [];
      this.scroller.scrollToAnchor("anchor-footer");
      if (this.name !== "") {
        this.digimonService.getByName(this.name).subscribe({
          next: (dados) => {
            this.dataList = dados as Digimon[];
            this.begin = 0;
            this.end = 10;
            this.dataSource = this.dataList.slice(this.begin, this.end);
            this.end > this.dataList.length ? this.showBtn = false : this.showBtn = true;
            this.showLoad = false;
            this.showNotfound = false;
          },
          error: (err) => {
            console.log('Não foi possível encontrar o Digimon', err);
            this.dataList = [];
            this.dataSource = [];
            this.showBtn = false;
            this.showLoad = false;
            this.showNotfound = true;
          }
        });
        this.table?.renderRows();
      } else {
        this.getAllDigimons();
      }
    } catch (error) {
      console.error(error);
      // this.snackBar.open('Erro ao buscar o Digimon pelo nome.', 'x');
    }
  }

}
