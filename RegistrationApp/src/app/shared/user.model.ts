export class User {
    id: number = 0;
    lastName: string;
    firstName: string = '';
    userName: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    termsofService: boolean;
    privacyPolicy: boolean;
    companyId: number = 0;
    companyName: string = '';
}

export class Company {
    id: number = 0;
    companyName: string = '';
    industryId: number = 0;
    industryName: string = '';
}

export class Industry {
    id: number = 0;
    industryName: string = '';
}