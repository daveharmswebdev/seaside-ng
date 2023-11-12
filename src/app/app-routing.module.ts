import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoIndexComponent } from './todo-index/todo-index.component';
import { HomeComponent } from './home/home.component';
import { BrowserUtils } from '@azure/msal-browser';
import { MsalGuard } from '@azure/msal-angular';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoIndexComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
