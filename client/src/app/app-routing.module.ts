import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRequireComponent } from './components/add-require/add-require.component';
import { GraphicComponent } from './components/graphic/graphic.component';


const routes: Routes = [
  { path: '', component: GraphicComponent },
  { path: 'add-advert', component: AddRequireComponent },
  { path: 'diagram', component: GraphicComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
