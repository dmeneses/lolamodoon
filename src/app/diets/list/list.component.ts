import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Diet } from 'src/app/shared/models/diet';
import { DietsService } from '../services/diets.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'patientsCount', 'sectionsCount', 'options'];
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  loading$: Observable<boolean>;
  diets$: Observable<Diet[]>;
  noResults$: Observable<boolean>;

  constructor(private dietsService: DietsService) { }

  ngOnInit(): void {
    this.loading$ = this.dietsService.loading$;
    this.noResults$ = this.dietsService.noResults$;
    this.diets$ = this.dietsService.diets$;
  }

  deleteDiet(diet: Diet) {
    this.dietsService.delete(diet.id).then();
  }
}
