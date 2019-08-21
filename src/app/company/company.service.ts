import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Company } from '../models/company';
import { Observable } from 'rxjs';
// import { from, Observable } from 'rxjs';
// import { of } from 'rxjs/internal/observable/of';
// import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyRef: AngularFirestoreDocument<Company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<Company>('companies/9pMLuG9tpU4utRtci8o9');
  }

  getCompanyObservable(): Observable<Company> {
    return this.companyRef.valueChanges();
  }

  saveCompany(company: Company) {
    this.companyRef.set(company)
      .then(_ => console.log('Success on set'))
      .catch(error => console.log('set', error));
    // from(this.companyRef.set(company))
    //   .pipe(
    //     catchError(error => {
    //       console.log('set', error);
    //       return of('Error');
    //     })
    //   );
  }

  editCompany(company: any) {
    this.companyRef.update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteCompany() {
    this.companyRef.delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

}
