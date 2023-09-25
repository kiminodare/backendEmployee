import {faker} from "@faker-js/faker";
import {IEmployeeModel} from "../model/employee.model";

export function generateFakeEmployee() : IEmployeeModel  {

    const beforeDecimal = faker.number.int({ min: 1000000, max: 9999999 });
    const cents = faker.number.int({ min: 0, max: 99 }).toString().padStart(2, '0');

    return {
        userName: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        birthDate: faker.date.past(),
        basicSalary: Number(`${beforeDecimal}.${cents}`),
        status: faker.helpers.arrayElement(['Active', 'Inactive']),
        group: faker.helpers.arrayElement(['IT', 'HR', 'Finance']),
    };
}