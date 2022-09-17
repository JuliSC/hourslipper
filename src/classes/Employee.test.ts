import { Employee } from "./Employee";

let employee: Employee;

beforeEach(() => {
  employee = new Employee("", "", "", "", 0, 0, new Date(), new Date(), "");
});

const provideSalary = [
  // Valid
  {
    salary: 20000, // Valid lower
    educationalLevel: 0, // Valid lower
    result: 20000,
  },
  {
    salary: 30000,
    educationalLevel: 1,
    result: 31220,
  },
  {
    salary: 30000,
    educationalLevel: 2,
    result: 32440,
  },
  {
    salary: 100000, // Valid upper
    educationalLevel: 3, // Valid Upper
    result: 103660,
  },

  // Invalid
  {
    salary: 10000, // Invalid lower
    educationalLevel: 0,
    result: 20000,
  },
  {
    salary: 110000, // Invalid upper
    educationalLevel: 0,
    result: 100000,
  },
  {
    salary: 30000,
    educationalLevel: -1, // Invalid lower
    result: 30000,
  },
  {
    salary: 30000,
    educationalLevel: 4, // Invalid upper
    result: 33660,
  },
];

describe.each(provideSalary)("Actual salary", salary => {
  it(`${salary.salary} + ${salary.educationalLevel} * 1220 should be ${salary.result}`, () => {
    employee.baseSalary = salary.salary;
    employee.educationalLevel = salary.educationalLevel;
    expect(employee.getSalary()).toBe(salary.result);
  });
});

const provideCountry = [
  {
    country: "Denmark",
    result: 0,
  },
  {
    country: "Norway",
    result: 0,
  },
  {
    country: "Sweden",
    result: 0,
  },
  {
    country: "Iceland",
    result: 50,
  },
  {
    country: "Finland",
    result: 50,
  },
  {
    country: "ASDOUYV",
    result: 100,
  },
  {
    country: "DENMARK",
    result: 100,
  },
];

describe.each(provideCountry)("Shipping costs", country => {
  it(`${country.country} should have ${country.result}% shipping costs`, () => {
    employee.country = country.country;
    expect(employee.getShippingCosts()).toBe(country.result);
  });
});

// const provideEmploymentDate = [
//   {
//     employmentDate: new Date("September 15, 2000"),
//     result: 22,
//   },
//   {
//     employmentDate: new Date("September 15, 2021"),
//     result: 1,
//   },
// ];

// describe.each(provideEmploymentDate)("Years of employment", employmentDate => {
//   it(`${employmentDate.employmentDate} should be ${employmentDate.result} year(s) ago`, () => {
//     employee.employmentDate = employmentDate.employmentDate;
//     expect(employee.getYearsOfEmployment()).toBe(employmentDate.result);
//   });
// });

const provideEmploymentDate = [
  {
    employmentDate: new Date("September 15, 2000"),
    result: 11,
  },
  {
    employmentDate: new Date("September 15, 2021"),
    result: 0.5,
  },
];

describe.each(provideEmploymentDate)("Employee discount", employmentDate => {
  it(`An employee hired on ${employmentDate.employmentDate} should have a/an ${employmentDate.result}% discount`, () => {
    employee.employmentDate = employmentDate.employmentDate;
    expect(employee.getDiscount()).toBe(employmentDate.result);
  });
});
