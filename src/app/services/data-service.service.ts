import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalData } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-07-2020.csv';
  constructor(private http : HttpClient ) { }

  getGlobatData(){
  return this.http.get(this.globalDataUrl, {responseType : 'text'}).pipe(
   map(result => {
     let data: GlobalData[] = [];
     let raw = {}
    let rows = result.split('\n');
    rows.splice(0, 1);
   // console.log(rows);
      rows.forEach(row => {
        let cols = row.split(/,(?=\S)/)
        let cs = {
          country : cols[3],
          confirmed : +cols[7],
          deaths : +cols[8],
          recovered : +cols[9],
          active : +cols[10]
        }
        let temp : GlobalData = raw[cs.country];
        if(temp){
          temp.active = cs.active + temp.active
          temp.confirmed = cs.confirmed + temp.confirmed
          temp.deaths = cs.deaths + temp.deaths
          temp.recovered = cs.recovered + temp.recovered
          raw[cs.country] = temp;
        }else{
          raw[cs.country] = cs;
        }
      })
     return <GlobalData[]>Object.values(raw);
   })
  )
  }
}
