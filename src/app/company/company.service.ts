import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Company } from '../models/company';
import { Observable } from 'rxjs';
// import { from, Observable } from 'rxjs';
// import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyRef: AngularFirestoreDocument<Company>;
  private companiesRef: AngularFirestoreCollection<Company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<Company>('companies/GKO1l0jZuj7d0buxQWi1');
    this.companiesRef = this.db.collection<Company>('companies');
  }

  getCompanyObservable(): Observable<Company> {
    return this.companyRef.valueChanges();
  }

   getCompaniesObservable(): Observable<Company[]> {
    return this.companiesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Company>[]): Company[] => {
          return items.map((item: DocumentChangeAction<Company>): Company => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        })
      );
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
