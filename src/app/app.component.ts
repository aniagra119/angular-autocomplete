import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServService } from '../app/serv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Search by table';

  @Output('data') graphData = [];
  tblOptions = [];
  colOptions = [];
  filteredTblOptions;
  filteredColOptions;

  formGroup: FormGroup;
  constructor(private service: ServService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.getTblNames();
    this.getColNames(null);
  }

  initForm() {
    this.formGroup = this.fb.group({
      table: [''],
      column: [''],
    });
    this.formGroup.get('table').valueChanges.subscribe((response) => {
      console.log('data is ', response);
      this.filterTblData(response);
    });

    this.formGroup.get('column').valueChanges.subscribe((response) => {
      console.log('data is ', response);
      this.filterColData(response);
    });
  }
  displayTblFn(value?: number) {
    return value
      ? this.filteredTblOptions.find((_) => _.id === value).description
      : undefined;
  }

  displayColFn(value?: number) {
    return value
      ? this.filteredColOptions.find((_) => _.id === value).description
      : undefined;
  }

  filterTblData(enteredData) {
    this.filteredTblOptions = this.tblOptions.filter((item) => {
      return item.description.indexOf(enteredData) > -1;
    });
  }

  filterColData(enteredData) {
    this.filteredColOptions = this.colOptions.filter((item) => {
      return item.description.indexOf(enteredData) > -1;
    });
  }

  getTblNames() {
    this.service.getTblData().subscribe((response) => {
      this.tblOptions = response;
      this.filteredTblOptions = response;
    });
  }

  getColNames(tblId) {
    this.service
      .getColData(tblId ? tblId - 100000 : null)
      .subscribe((response) => {
        this.colOptions = response;
        this.filteredColOptions = response;
      });
  }

  onSubmit() {
    this.service.getGraph(this.formGroup.value).subscribe((response) => {
      this.graphData = response;
      console.log(this.graphData);
    });
  }
}
