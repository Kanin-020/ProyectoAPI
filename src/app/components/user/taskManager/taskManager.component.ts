import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SessionGuard } from 'src/app/guards/session.guard';
import * as userListJSON from "src/assets/json/taskSample.json";


@Component({
  selector: 'app-taskManager',
  templateUrl: './taskManager.component.html',
  styleUrls: ['./taskManager.component.scss'],
  providers: [SessionGuard]
})
export class TaskManagerComponent implements OnInit {
  protected taskList: any[] = [];

  protected page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  constructor() { }


  ngOnInit() {
    this.taskList = (userListJSON as any).default;
    this.page.length = this.taskList.length;

    console.log(this.taskList.length);
    this.getMinimumDate(this.getDates());
  }

  /**
   * Ordena la lista por fecha.
   * @returns stringDates - Fechas en formatos de texto.
   */
  getDates(): String[] {
    let stringDates: String[] = new Array<String>;
    this.taskList.forEach(function (task) {
      stringDates.push(task['fecha-de-entrega']);
    })

    stringDates.forEach(function (strings) {
      console.log("String que se les hizo push" + strings);
    })
    return stringDates;
  }

  /**
   * Obtiene el dato con la fecha del día de hoy.
   * @returns today - La fecha del día de hoy en formato de texto.
   */
  getTodaysDate(): string {
    let today: string = new Date().toISOString().split('T')[0];;
    console.log(today);
    return today;
  }

  //TODO
  // convertStringToDate(stringsToConvert: string[]): Date{
  //   return new Date(stringsToConvert[0], stringsToConvert[1], stringsToConvert[2]);
  // }


  /**
   * Conversión e formato a reducido.
   * @param stringDates - Las fechas en formato de texto.
   * @returns formattedDate - Valor de fecha formateado.
   */
  getMinimumDate(stringDates: String[]): String {
    let dates: any[] = [];
    let minimumDate!: Date;
    let formattedDate: string;

    stringDates.map(function (string) {


      dates.push(new Date(string.split("-").join("/")));
    })

    minimumDate = new Date(Math.min.apply(null, dates));
    console.log(minimumDate.toISOString().split('T')[0]);

    formattedDate = minimumDate.toISOString().split('T')[0];

    return formattedDate;
  }


}

