import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'CRUD - Home'
    }
  ]
  
  export default routeConfig;