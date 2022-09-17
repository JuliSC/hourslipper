import { NumberHelper } from "./../utils/NumberHelper";

const EDUCATIONAL_LEVEL_STRINGS: Array<string> = [
  "none",
  "primary",
  "secondary",
  "tertiary",
];

const DEPARTMENTS: Array<string> = [
  "HR",
  "Finance",
  "IT",
  "Sales",
  "General Services",
];

const COUNTRIES_NO_SHIPPING_COST: Array<string> = [
  "Denmark",
  "Sweden",
  "Norway",
];
const COUNTRIES_HALF_SHIPPING_COST: Array<string> = ["Iceland", "Finland"];

export class Employee {
  // Fields
  #cpr: string;
  #firstName: string;
  #lastName: string;
  #department: string;
  #baseSalary: number;
  #educationalLevel: number;
  #birthDate: Date;
  #employmentDate: Date;
  #country: string;

  constructor(
    cpr: string,
    firstName: string,
    lastName: string,
    department: string,
    baseSalary: number,
    educationalLevel: number,
    birthDate: Date,
    employmentDate: Date,
    country: string,
  ) {
    this.#cpr = cpr;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#department = department;
    this.#baseSalary = baseSalary;
    this.#educationalLevel = educationalLevel;
    this.#birthDate = birthDate;
    this.#employmentDate = employmentDate;
    this.#country = country;
  }

  // Methods
  public getSalary() {
    return this.#baseSalary + this.#educationalLevel * 1220;
  }

  public getYearsOfEmployment() {
    const ageDifMs: number = Date.now() - this.#employmentDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  public getDiscount() {
    return this.getYearsOfEmployment() * 0.5;
  }

  public getShippingCosts() {
    if (COUNTRIES_NO_SHIPPING_COST.includes(this.#country)) {
      return 0;
    } else if (COUNTRIES_HALF_SHIPPING_COST.includes(this.#country)) {
      return 50;
    } else {
      return 100;
    }
  }

  public get cpr(): string {
    return this.#cpr;
  }

  public set cpr(v: string) {
    this.#cpr = v;
  }

  public get firstName(): string {
    return this.#firstName;
  }

  public set setFirstName(v: string) {
    this.#firstName = v;
  }

  public get lastName(): string {
    return this.#lastName;
  }

  public set lastName(v: string) {
    this.#lastName = v;
  }

  public get department(): string {
    return this.#department;
  }

  public set department(v: string) {
    this.#department = v;
  }

  public get baseSalary(): number {
    return this.#baseSalary;
  }

  public set baseSalary(v: number) {
    this.#baseSalary = NumberHelper.ensureMinMax(v, 20000, 100000);
  }

  public getEducationalLevel(): string {
    return EDUCATIONAL_LEVEL_STRINGS[this.#educationalLevel];
  }

  public set educationalLevel(v: number) {
    this.#educationalLevel = NumberHelper.ensureMinMax(v, 0, 3);
  }

  public get birthDate(): Date {
    return this.#birthDate;
  }

  public set birthDate(v: Date) {
    this.#birthDate = v;
  }

  public get employmentDate(): Date {
    return this.#employmentDate;
  }

  public set employmentDate(v: Date) {
    this.#employmentDate = v;
  }

  public get country(): string {
    return this.#country;
  }

  public set country(v: string) {
    this.#country = v;
  }
}
