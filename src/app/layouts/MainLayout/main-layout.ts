import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    Footer
  ],
  template: `
    <app-header *ngIf="showHeaderFooter"></app-header>

    <main class="content">
      <router-outlet></router-outlet>
    </main>

    <app-footer *ngIf="showHeaderFooter"></app-footer>
  `,
  styleUrls: ['./main-layout.css']
})
export class MainLayout {

  showHeaderFooter = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const currentRoute = window.location.pathname;
      if (currentRoute === '/login' || currentRoute === '/registro') {
        this.showHeaderFooter = false;
      }
    }
  }
}
