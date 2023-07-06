import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomeComponent],
  template: `
    <header class="header">
      <a [routerLink]="['/']">
        <img src="../assets/actuarLogo.svg" alt="Actuar Logo" aria-hidden="true"/>
      </a>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
