import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from './shared/user.service';
import { MatStepper } from '@angular/material/stepper';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ``
})
export class AppComponent implements OnInit {

  protected isLinear = true; // Flag to indicate if the stepper should be linear
  protected isSubmitError = false; // Flag to indicate if there was an error during form submission
  public companyDataFG: FormGroup; // Form group for company data
  public userDataFG: FormGroup; // Form group for user data
  public termsNprivacyFG: FormGroup; // Form group for terms and privacy

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
    // Initialize form groups and their form controls with validators

    // Form group for company data
    this.companyDataFG = new FormGroup({
      companyName: new FormControl('', Validators.required), // Form control for company name
      industryId: new FormControl('', Validators.required), // Form control for industry ID
    });

    // Form group for user data
    this.userDataFG = new FormGroup({
      lastName: new FormControl('', Validators.required), // Form control for name
      firstName: new FormControl('', Validators.required), // Form control for first name
      username: new FormControl('', [Validators.required], this.validateUsernameNotTaken.bind(this)), // Form control for username with custom async validator
      password: new FormControl('', [Validators.required, Validators.minLength(8)]), // Form control for password
      confirmPassword: new FormControl('', [Validators.required, this.confirmPasswordValidator.bind(this)]), // Form control for confirming password
      email: new FormControl('', Validators.email), // Form control for email
    });

    // Form group for terms and privacy
    this.termsNprivacyFG = new FormGroup({
      terms: new FormControl('', [Validators.required, Validators.requiredTrue]), // Form control for terms checkbox
      privacy: new FormControl('', [Validators.required, Validators.requiredTrue]), // Form control for privacy checkbox
    });

    // Fetch user data from the service
    this.getUsers();

    // Fetch company data from the service
    this.userService.getCompanies().subscribe(data => {
      this.userService.allCompanies = data;
    });

    // Fetch industry data from the service
    this.userService.getIndustries().subscribe(data => {
      this.userService.allIndustries = data;
    });
  }

  /**
   * Custom async validator to check if username is already taken.
   * @param control The form control for username.
   * @returns An observable that resolves to a validation error if the username is taken, or null if it is not taken.
   */
  public validateUsernameNotTaken(control: AbstractControl) {
    return this.userService.validateUsernameNotTaken(control).pipe(
      map(res => {
        return res ? null : { usernameTaken: true };
      })
    );
  }

  /**
   * Custom validator to check if password and confirm password match.
   * @param control The form control for confirming password.
   * @returns A validation error if the passwords do not match, or null if they match.
   */
  public confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.userDataFG?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Gets the users from the service.
   */
  public getUsers() {
    this.userService.getUser().subscribe(data => {
      this.userService.allUsers = data;
    });
  }

  /**
   * Submits the company and user data.
   * @param stepper The MatStepper component used for navigation.
   */
  public submitCompanyAndUserData(stepper: MatStepper) {
    if (this.companyDataFG.valid && this.userDataFG.valid) {
      const companyData = this.companyDataFG.value;
      this.userService.saveCompanies(companyData).subscribe({
        next: (res: any) => {
          const companyId = res.id;
          const companyName = res.companyName;
          let userData = this.userDataFG.value;
          userData.companyId = companyId;
          userData.companyName = companyName;
          this.userService.saveUser(userData).subscribe({
            next: () => {
              stepper.next();
              this.getUsers();
            },
            error: (error) => {
              this.isSubmitError = true;
              console.error(error);
            }
          });
        },
        error: (error) => {
          this.isSubmitError = true;
          console.error(error);
        }
      });
    }
  }

  /**
   * Gets the industry name by ID.
   * @param industryId The ID of the industry.
   * @returns The name of the industry, or an empty string if the ID is null or undefined.
   */
  protected getIndustryNameById(industryId: number | null | undefined) {
    if (industryId === null || industryId === undefined) {
      return '';
    }
    const industry = this.userService.allIndustries.find(ind => ind.id === industryId);
    return industry ? industry.industryName : '';
  }

  /**
   * Gets the company name by ID.
   * @param companyId The ID of the company.
   * @returns The name of the company, or an empty string if the ID is null or undefined.
   */
  protected getCompanyNameById(companyId: number | null | undefined) {
    if (companyId === null || companyId === undefined) {
      return '';
    }
    const company = this.userService.allCompanies.find(cmpny => cmpny.id === companyId);
    return company ? company.companyName : '';
  }
}
