import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FrontService } from '../../services/front.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {

  constructor(private route: Router, private fr: FrontService) { }

  menuaberto = false;

  alterarEstadoMenu() {
    this.menuaberto = !this.menuaberto
  }

  LogOut() {
    sessionStorage.removeItem('userTipo');
    sessionStorage.removeItem('userNome');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    this.fr.SalvarLog("saiu do sistema")
    this.fr.addLog();
    this.route.navigate([('/')]);
  }



}
