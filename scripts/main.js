import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('students');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBoxMin = document.getElementById("search-box-number-min");
var inputSearchBoxMax = document.getElementById("search-box-number-max");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByNumber(); };
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                             <td>" + c.professor + "</td>\n                             <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(student) {
    var trElement = document.createElement("tbody");
    trElement.innerHTML = "\n                        <tr>\n                            <td class=\"tableRows\">C\u00F3digo</td>\n                            <td class=\"tableRows\">" + student.codigo + "</td>\n                        </tr>\n                        <tr>\n                            <td class=\"tableRows\">C\u00E9dula</td>\n                            <td class=\"tableRows\">" + student.cedula + "</td>\n                        </tr>\n                        <tr>\n                            <td class=\"tableRows\">Edad</td>\n                            <td class=\"tableRows\">" + student.edad + "</td>\n                        </tr>\n                        <tr>\n                            <td class=\"tableRows\">Direcci\u00F3n</td>\n                            <td class=\"tableRows\">" + student.direccion + "</td>\n                        </tr>\n                        <tr>\n                            <td>Tel\u00E9fono</td>\n                            <td>" + student.telefono + "</td>\n                        <tr>\n                        ";
    studentTbody.appendChild(trElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByNumber() {
    var numero1 = inputSearchBoxMin.valueAsNumber;
    var numero2 = inputSearchBoxMax.valueAsNumber;
    numero1 = (numero1 == null) ? 0 : numero1;
    numero2 = (numero2 == null) ? 5 : numero2;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(numero1, numero2, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(numero1, numero2, courses) {
    var newCourses = [];
    var a = 0;
    for (a; a < courses.length; a++) {
        if (courses[a].credits > numero1 && courses[a].credits < numero2) {
            newCourses.push(courses[a]);
        }
    }
    return newCourses;
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByNumber(); };
