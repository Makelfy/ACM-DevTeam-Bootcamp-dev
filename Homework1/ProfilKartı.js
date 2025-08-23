class Person {
  #age;
  static classnameCount = 0;

  constructor(name, age) {
    this.name = name;
    this.setAge(age);
    Person.classnameCount++;
  }

  getAge() {
    return this.#age;
  }
  setAge(newAge) {
    if (typeof newAge !== "number" || isNaN(newAge)) {
      throw new Error("Yaş bir sayı olmalıdır");
    } else if (newAge < 0) {
      throw new Error("Yaş negatif olamaz!");
    } else if (newAge > 120) {
      throw new Error("🤨");
    } else {
      this.#age = newAge;
    }
  }

  introduce() {
    console.log(`Merhaba, ben ${this.name}. ${this.#age} yaşındayım.`);
  }

  static count() {
    return Person.classnameCount;
  }
}

class Student extends Person {
  static classnameCount = 0;

  constructor(name, age, studentNo) {
    super(name, age);
    this.studentNo = studentNo;
    Student.classnameCount++;
  }

  introduce() {
    console.log(
      `Merhaba, ben ${
        this.name
      }. ${this.getAge()} yaşındayım. Öğrenci Numaram ${this.studentNo}.`
    );
  }
  static count() {
    return Student.classnameCount;
  }
}

class Instructor extends Person {
  #branch;
  static classnameCount = 0;

  constructor(name, age, branch) {
    super(name, age);
    this.#branch = branch;
    Instructor.classnameCount++;
  }

  introduce() {
    console.log(
      `Merhaba, ben ${this.name}. ${this.getAge()} yaşındayım. Branşım: ${
        this.#branch
      }.`
    );
  }

  static count() {
    return Instructor.classnameCount;
  }
}

const p1 = new Person("Bahadır", 20);
const s1 = new Student("Arda", 20, "2025001");
const s2 = new Student("Esma", 19, "2025002");
const i1 = new Instructor("Arca", 20, "Fullstack Development");

console.log(Person.count());
// 4
console.log(Student.count());
// 2

console.log(Instructor.count());
// 1
