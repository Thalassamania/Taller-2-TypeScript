import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

const coursesTbody: HTMLElement = document.getElementById('courses')!;
const studentTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-number-min")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-number-max")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;



btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByNumber();

renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}` ;


function renderCoursesInTable(courses: Course[]): void {
    courses.forEach(c => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${c.name}</td>
                             <td>${c.professor}</td>
                             <td>${c.credits}</td>`;
      coursesTbody.appendChild(trElement);
    });
  }
 
  function renderStudentsInTable(student: Student): void {

      let trElement = document.createElement("tbody");
      trElement.innerHTML = `
                        <tr>
                            <td class="tableRows">Código</td>
                            <td class="tableRows">${student.codigo}</td>
                        </tr>
                        <tr>
                            <td class="tableRows">Cédula</td>
                            <td class="tableRows">${student.cedula}</td>
                        </tr>
                        <tr>
                            <td class="tableRows">Edad</td>
                            <td class="tableRows">${student.edad}</td>
                        </tr>
                        <tr>
                            <td class="tableRows">Dirección</td>
                            <td class="tableRows">${student.direccion}</td>
                        </tr>
                        <tr>
                            <td>Teléfono</td>
                            <td>${student.telefono}</td>
                        <tr>
                        `;
      studentTbody.appendChild(trElement);

  }

  function applyFilterByName() { 
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }

  function applyFilterByNumber() { 
    let numero1 = inputSearchBoxMin.valueAsNumber;
    let numero2 = inputSearchBoxMax.valueAsNumber;
    numero1 = (numero1 == null) ? 0 : numero1;
    numero2 = (numero2 == null) ? 5 : numero2;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(numero1, numero2, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }

  function searchCourseByCredits(numero1: number, numero2: number, courses: Course[]) {
    let newCourses = [];
    var a  : number = 0;
    for (a; a < courses.length; a++) {
      if (courses[a].credits > numero1 && courses[a].credits < numero2){
        newCourses.push(courses[a]);
      }
   }
  
    return newCourses;
  }

  function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
  }


function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
  }

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByNumber();


