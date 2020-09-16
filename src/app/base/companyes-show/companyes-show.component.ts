import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyes-show',
  templateUrl: './companyes-show.component.html',
  styleUrls: ['./companyes-show.component.scss']
})
export class CompanyesShowComponent implements OnInit {

  companyes: any = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getData('company/all').subscribe((res: any) => {
      this.companyes = res.body;
    });
  }

}
