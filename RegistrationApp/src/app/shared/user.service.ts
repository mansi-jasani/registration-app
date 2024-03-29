import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Industry, User, Company } from './user.model';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { map } from "rxjs/operators";
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private myhttp: HttpClient) { }

  // API URLs
  userAPIUrl: string = `${this.apiUrl}/user`;
  companiesAPIUrl: string = `${this.apiUrl}/Company`;
  industriesAPIUrl: string = `${this.apiUrl}/Industry`;

  // Arrays to store data
  allUsers: User[] = [];
  allCompanies: Company[] = [];
  allIndustries: Industry[] = [];

  // Objects to store data
  userData: User = new User();
  companyData: Company = new Company();

  /**
   * Validates if the username is not already taken.
   * @param control - The form control containing the username value.
   * @returns An observable that emits `null` if the username is not taken, or an object with `usernameTaken: true` if the username is taken.
   */
  public validateUsernameNotTaken(control: AbstractControl) {
    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { usernameTaken: true };
      })
    );
  }

  /**
   * Checks if the given username is already taken.
   * @param username - The username to check.
   * @returns An observable that emits `true` if the username is not taken, or `false` if the username is taken.
   */
  private checkUsernameNotTaken(username: string): Observable<boolean> {
    const url = `${this.userAPIUrl}/CheckUsername/${encodeURIComponent(username)}`;
    return this.myhttp.get<boolean>(url);
  }

  /**
   * Saves a new user.
   * @param userData - The user data to save.
   * @returns An observable that emits the response from the API.
   */
  public saveUser(userData: User) {
    return this.myhttp.post(this.userAPIUrl, userData);
  }

  /**
   * Saves a new company.
   * @param companyData - The company data to save.
   * @returns An observable that emits the response from the API.
   */
  public saveCompanies(companyData: Company) {
    return this.myhttp.post(this.companiesAPIUrl, companyData);
  }

  /**
   * Retrieves all users.
   * @returns An observable that emits an array of users.
   */
  public getUser(): Observable<User[]> {
    return this.myhttp.get<User[]>(this.userAPIUrl).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => 'Something went wrong. Please try again later.');
      })
    );
  }

  /**
   * Retrieves all companies.
   * @returns An observable that emits an array of companies.
   */
  public getCompanies(): Observable<Company[]> {
    return this.myhttp.get<Company[]>(this.companiesAPIUrl).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => 'Something went wrong. Please try again later.');
      })
    );
  }

  /**
   * Retrieves all industries.
   * @returns An observable that emits an array of industries.
   */
  public getIndustries(): Observable<Industry[]> {
    return this.myhttp.get<Industry[]>(this.industriesAPIUrl).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => 'Something went wrong. Please try again later.');
      })
    );
  }

  /**
   * Updates the user data.
   * @returns An observable that emits the response from the API.
   */
  public updateUser() {
    return this.myhttp.put(`${this.userAPIUrl}/${this.userData.id}`, this.userData);
  }

  /**
   * Updates the company data.
   * @returns An observable that emits the response from the API.
   */
  public updateCompanies() {
    return this.myhttp.put(`${this.companiesAPIUrl}/${this.companyData.id}`, this.companyData);
  }

  /**
   * Deletes a user.
   * @param id - The ID of the user to delete.
   * @returns An observable that emits the response from the API.
   */
  public deleteUser(id: number) {
    return this.myhttp.delete(`${this.userAPIUrl}/${id}`);
  }
}
