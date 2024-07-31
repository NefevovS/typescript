import { City, Person, Product, Employee } from "./dataTypes.js";

let people = [
  new Person("Bob Smith", "London"),
  new Person("Dora Peters", "New York"),
];
let products = [new Product("Running Shoes", 100), new Product("Hat", 25)];
let cities = [new City("London", 813600), new City("Paris", 2141000)];
let employees = [
  new Employee("Bob Smith", "Sales"),
  new Employee("Alice Jones", "Sales"),
];

class DataCollection<T extends { name: string }> {
  protected items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  collate<U>(targetData: U[], itemProp: string, targetProp: string): (T & U)[] {
    let result = [];
    this.items.forEach((item) => {
      let match = targetData.find((d) => d[targetProp] === item[itemProp]);
      if (match !== undefined) {
        result.push({ ...match, ...item });
      }
    });
    return result;
  }
}

class SearchableCollection extends DataCollection<Employee> {
  constructor(initialItems: Employee[]) {
    super(initialItems);
  }
  find(searchItem: string): Employee[] {
    return this.items.filter(
      (item) => item.name === searchItem || item.role === searchItem
    );
  }
}

let employeesData = new SearchableCollection(employees);
let findEmpl = employeesData.find("Sales");
console.log(findEmpl);
