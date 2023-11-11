import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoIndexComponent} from "./todo-index/todo-index.component";

const routes: Routes = [
  {
    path: '', component: TodoIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
