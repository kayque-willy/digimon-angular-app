import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigimonsListPageComponent } from './pages/digimons/digimons-list-page/digimons-list-page.component';

const routes: Routes = [
  {
    path: '', //Aqui é definido o caminho do root da aplicação
    component: DigimonsListPageComponent, //O caminho definido na rota leva a execução do componente
    // canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
