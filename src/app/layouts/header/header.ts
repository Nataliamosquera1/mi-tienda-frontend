import { Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CarritoService } from '../../core/services/carrito';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements DoCheck {

  menuAbierto = false;
  cantidad = 0;

  isAdmin = false;
  isLogged = false;

  constructor(
    private auth: AuthService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngDoCheck() {

    this.isLogged = this.auth.isLogged();
    this.isAdmin = this.auth.isAdmin();
    this.cantidad = this.carritoService.getCantidadTotal();

    console.log('Header State =>', {
      isLogged: this.isLogged,
      isAdmin: this.isAdmin,
      cantidad: this.cantidad
    });
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  logout(event?: Event) {
    if (event) event.stopPropagation();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
