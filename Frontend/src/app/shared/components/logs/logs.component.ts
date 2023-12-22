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

  logs: Array<ILog> = [];
  permissao = sessionStorage.getItem('userTipo');
  constructor(private frontService: FrontService, private router: Router) {
    this.Buscar();
    this.frontService.SalvarLog("visualizou os Logs do sistema");
    this.frontService.addLog();
  }

  Buscar() {
    this.frontService.getAll("api/logs", this.logs).subscribe(log => {
      this.logs = log;
      console.log(log);
    });
  }


}
