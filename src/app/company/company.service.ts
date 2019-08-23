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

  getCompanyObservable(id: string): Observable<Company> {
    // return this.db.doc<Company>(`companies/${id}`).valueChanges();
    return this.companiesRef.doc<Company>(id).valueChanges();
  }

  getCompaniesByEmployeeCount(numberE: number) {
    return this.db.collection('companies', ref => ref.where('employeeCount', '>=', numberE)).valueChanges();
  }

   getCompaniesObservable(): Observable<Company[]> {
    return this.companiesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Company>[]): Company[] => {
          return items.map((item: DocumentChangeAction<Company>): Company => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone,
              zip: item.payload.doc.data().zip,
              employeeCount: item.payload.doc.data().employeeCount
            };
          });
        })
      );
  }

  saveCompany(company: Company) {
    this.companiesRef.add(company)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editCompany(company: Company) {
    this.companiesRef.doc(company.id).update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteCompany(id: string) {
    this.companiesRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

}
