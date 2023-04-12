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

  //Busca por nome
  name: string = "";

  // Busca por level
  selectLevel: string = "";

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

  async getDigimonsbyLevel() {
    try {
      //O subscribe é usado pra recuperar o resultado da requisição
      this.digimonService.getByLevel(this.selectLevel).subscribe(dados => {
        this.dataSource = dados as Digimon[];
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
