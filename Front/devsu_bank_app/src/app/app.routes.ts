import { Routes } from '@angular/router';
import { ClientComponent } from './component/client/client.component';
import { AccountComponent } from './component/account/account.component';
import { MovementComponent } from './component/movement/movement.component';

export const routes: Routes = [
  {path:'', component: ClientComponent},
  {path:'clientes', component: ClientComponent},
  {path: 'cuentas', component: AccountComponent},
  {path: 'movimientos', component: MovementComponent}
];
