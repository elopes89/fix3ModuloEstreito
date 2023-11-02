import { Component } from '@angular/core';
import { ILog } from '../../interfaces/ILog';
import { FrontService } from '../../services/front.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {

  constructor(private frontService: FrontService, private router: Router) {
    this.Buscar();
  }

  Buscar() {
    this.frontService.getAll("ListarLogs", this.logs).subscribe(user => {
      this.logs = user;
      console.log(user);
    });
  }
  logs: Array<ILog> = [];
}
