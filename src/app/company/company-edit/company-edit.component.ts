import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  companyFormGroup: FormGroup;
  isEdit = false;

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder

  ) {
    // if (!this.isNew) {
    //   this.company$ = companyService.getCompanyObservable(this.id);
    // } else {
    //   this.company$ = of({}) as Observable<Company>;
    // }
  }

  ngOnInit() {
    const companyId = this.activatedRoute.snapshot.params.id;
    // let currentCompany = {};

    if (companyId === 'new') {
      // this.company$ = of({}) as Observable<Company>;
      this.companyFormGroup = this.fb.group({
        id: '',
        name: '',
        phone: '',
        zip: '',
        employeeCount: ''
      });
    } else {
      this.isEdit = true;
      this.companyService
        .getCompanyObservable(companyId)
        .subscribe((company: Company) => {
          this.companyFormGroup = this.fb.group({
            id: companyId,
            name: company.name,
            phone: company.phone,
            zip: company.zip,
            employeeCount: company.employeeCount
          });
        });
    }
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

  get id(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  saveCompany(company) {
    company.employeeCount = +company.employeeCount;
    this.companyService.saveCompany(company);
  }

  editCompany(company) {
    company.employeeCount = +company.employeeCount;
    this.companyService.editCompany(company);
  }

  deleteCompany(id) {
    this.companyService.deleteCompany(id);
  }

}
