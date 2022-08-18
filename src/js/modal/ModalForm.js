import FormDentist from "../forms/FormDentist.js";
import FormTherapist from "../forms/FormTherapist.js";
import FormCardiologist from "../forms/FormCardiologist.js";
import Select from "../forms/Select.js";
import Modal from "./Modal.js";

// Modifizieren Sie das Modalformular für die Arztwahl /Модифікувати модальну форму для вибору лікаря / We modify the modal form for choosing a doctor
export default class ModalForm extends Modal {
    constructor() {
        super();
        debugger
        this.doctor = new Select(["Choose a doctor", "Cardiologist", "Dentist", "Therapist"]).create();
    }
//Wir zeichnen das modale Formular, wenden den Handler auf den Arztauswahlselektor an
// Відмальовуємо модальну форму, доаємо обробник на селектор вибору лікаря 
// Draw a modal form, add a handler to the doctor selection selector
    render() {
        super.render();

        this.doctor.addEventListener("change", (event) => {
            this.selectForm(event);
        });

        this.element.btnSubmit.remove();
        this.element.modalWindow.insertBefore(this.doctor, this.element.btnClose);
    }
//Überprüfung auf Vorhandensein eines offenen Formulars durch einen anderen Spezialisten, 
//wenn ja => wird gelöscht, dann wird das Formular für den ausgewählten Arzt gezeichnet
//Перевірка на існування відкритої форми по іншому спеціалісту, якщо є => видаляється, після відмальовується форма по обраному лікарю
//The check for the existence of an open form for another doctor, if any, is deleted, after that the form for the selected doctor is drawn
    checkAndPutForm(newForm, existForm) {
        if (existForm) {
            this.element.modalWindow.removeChild(existForm);
            newForm.render(this.element.modalWindow);
        } else {
            newForm.render(this.element.modalWindow);
        }
    }

// Möglichkeit der Zuweisung einer Klasse nach dem gewählten Arzt / Ф-ція присвоєння класу пообраному лікурю / The function of assigning a form class according to the selected doctor
    selectForm(event) {
        const exist = this.element.modalWindow.children[2];

        if (event.target.value === "Cardiologist") {
            const form = new FormCardiologist(event.target.value);
            this.checkAndPutForm(form, exist);
        } else if (event.target.value === "Dentist") {
            const form = new FormDentist(event.target.value);
            this.checkAndPutForm(form, exist);
        } else if (event.target.value === "Therapist") {
            const form = new FormTherapist(event.target.value);
            this.checkAndPutForm(form, exist);
        }
    }

    edit(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit) {
        const exist = this.element.modalWindow.children[2];


        if (doctor === "Cardiologist") {
            const form = new FormCardiologist(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName);
            this.checkAndPutForm(form, exist);
        } else if (doctor === "Dentist") {
            const form = new FormDentist(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit);
            this.checkAndPutForm(form, exist);
        } else if (doctor === "Therapist") {
            const form = new FormTherapist(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit);
            this.checkAndPutForm(form, exist);
        }
    }

    ifEditModal(id) {
        this.element.modalWindow.dataset.id = id;
        this.element.modalWrapper.dataset.id = id;
    }
}
//Der "click"-Event-Handler auf der "Create"-Schaltfläche provoziert die Anzeige eines modalen Formulars
// Обробник подіх "click" на кнопку "створити" провокує відображення модальної форми/ CREATE button click handler, starts the creation of a modal form
const btn = document.querySelector(".header__btn-create");
btn.addEventListener("click", () => {

    const modal = new ModalForm();
    modal.render();
});