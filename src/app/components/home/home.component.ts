import { Component, OnInit } from '@angular/core';
import { GlobalData } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  glbData : GlobalData[];
  constructor(private dataService : DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobatData().subscribe(
      {
        next : (result) => {
          console.log(result);
          this.glbData = result;
          result.forEach(cs => {
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive += cs.active
            this.totalConfirmed += cs.confirmed
            this.totalDeaths += cs.deaths
            this.totalRecovered += cs.recovered
            }
            
          })
        }
      }
    )
  }

}
