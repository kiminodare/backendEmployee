export interface IEmployeeModel {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    basicSalary: number;
    status: 'Active' | 'Inactive';
    group: 'IT' | 'HR' | 'Finance';
}