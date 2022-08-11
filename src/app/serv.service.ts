import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, skipWhile, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServService {
  constructor(private http: HttpClient) {}

  getTblData() {
    return this.http
      .get('http://localhost:3000/gettblname')
      .pipe(map((response: []) => response.map((item) => item)));
  }

  getColData(id) {
    const query = id ? `?tblId=${id}` : ``;
    return this.http.get(`http://localhost:3000/getcolname/${query}`).pipe(
      map((response: []) => {
        return response.map((item) => item);
      })
    );
  }

  getGraph(value) {
    const tblId = value.table;
    const colId = value.column;
    const query = colId
      ? `?colId=${colId.map((col) => col - 200000)}`
      : `?tblId=${tblId}`;
    return this.http.get(`http://localhost:3000/getlinktbl/${query}`).pipe(
      map((response: []) => {
        return response.map((item) => item);
      })
    );
  }
}
