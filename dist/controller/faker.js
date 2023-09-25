"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeEmployee = void 0;
const faker_1 = require("@faker-js/faker");
function generateFakeEmployee() {
    const beforeDecimal = faker_1.faker.number.int({ min: 1000000, max: 9999999 });
    const cents = faker_1.faker.number.int({ min: 0, max: 99 }).toString().padStart(2, '0');
    return {
        userName: faker_1.faker.internet.userName(),
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        birthDate: faker_1.faker.date.past(),
        basicSalary: Number(`${beforeDecimal}.${cents}`),
        status: faker_1.faker.helpers.arrayElement(['Active', 'Inactive']),
        group: faker_1.faker.helpers.arrayElement(['IT', 'HR', 'Finance']),
    };
}
exports.generateFakeEmployee = generateFakeEmployee;
