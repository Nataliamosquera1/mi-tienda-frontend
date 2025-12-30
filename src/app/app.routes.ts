import { Routes } from '@angular/router';

// Guards
import { authGuard } from './core/guards/auth-guard';


// Layouts
import { MainLayout } from './layouts/MainLayout/main-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

// Pages públicas
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { ProductosComponent } from './pages/productos/productos';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';
import { Categorias } from './pages/categorias/categorias';
import { Carrito } from './pages/carrito/carrito';
import { Perfil } from './pages/perfil/perfil';
import { Descuentos } from './pages/descuentos/descuentos';

// Admin Pages
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard'


export const routes: Routes = [

  // 🌸 PÚBLICO
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'productos', component: ProductosComponent },
      { path: 'producto/:id', component: ProductoDetalle },
      { path: 'categorias', component: Categorias },
      { path: 'login', component: Login },
      { path: 'registro', component: Registro },
      { path: 'carrito', component: Carrito, canActivate: [authGuard] },
      { path: 'perfil', component: Perfil, canActivate: [authGuard] },
      { path: 'descuentos', loadComponent: () => import('./pages/descuentos/descuentos')
      .then(m => m.Descuentos)
},

    ]
  },

  // 🔐 ADMIN
  {
    path: 'admin',
    component: AdminLayout,
    //canActivate: [authGuard, adminGuard],
    children: [
      { path: '', component: AdminDashboard },
     
    ]
  },

  // ❌ NOT FOUND
  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfound/notfound').then(m => m.Notfound)
  }
];
