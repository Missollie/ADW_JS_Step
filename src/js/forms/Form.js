import Input from "./Input.js"
import TextArea from "./TextArea.js"
import {fieldsForm} from "./FieldsForm.js"
import Select from "./Select.js";
import {createCard, editCard} from "../modal/ajax.js";
import {VisitDentist, VisitCardiologist, VisitTherapist} from "../cards/Visit.js";

export default class Form {

    constructor(doctor, fullName, priority, purpose, desc) {
        this.self = document.createElement("form");
        this.doctor = doctor;
        this.priority = new Select(fieldsForm.priority).create();
        this.fullName = new Input(fieldsForm.fullName, "form__input").create();
        this.placeholderForEdit(fullName, this.fullName, 'Change/confirm full name: ')
        this.purpose = new Input(fieldsForm.purpose, "form__input").create();
        this.placeholderForEdit(purpose, this.purpose, 'Change/confirm the purpose of the visit: ')
        this.desc = new TextArea(fieldsForm.desc, "form__input").create();
        this.placeholderForEdit(desc, this.desc, 'Change/confirm the brief description of the visit: ')
        this.submit = new Input(fieldsForm.submit, "form__submit").create();
        this.submit.value = "Save visit";
    }

   placeholderForEdit(field, thisField, text) {
      if (field) thisField.placeholder = `${text} ${field}`;
      thisField.onclick = function (e) {
         if (field){
            e.target.value = `${field}`;
         }}
   }

    render(modal) {
        this.self.classList.add("form");
        this.submit.addEventListener("click", async (event) => {
            event.preventDefault();
            const newCardOut = this.collectData(),
                modal = document.querySelector(".header__modal-wrapper");
            if (this.isDataFilled(newCardOut)) {
                if (!modal.dataset.id) {
                    const newCardIn = await createCard(newCardOut).then(r => r.json());
                    this.submitForm(newCardIn, modal);
                } else {
                    const editedCard = await editCard(newCardOut, modal.dataset.id).then(r => r.json());
                    this.submitEdit(editedCard, modal);
                }
            }
        });
        this.self.append(this.priority, this.fullName, this.purpose, this.desc, this.submit);
        modal.append(this.self);
    }

    collectData() {
        const data = {};
        for (let key in this) {
            if (key === "self" || key === "submit") {
                continue;
            } else if (key === "doctor") {
                data[key] = this[key];
            } else {
                data[key] = this[key].value;
            }
        }
        return data;
    }

    isDataFilled(objectToCheck) {
        for (let key in objectToCheck) {
            if (objectToCheck[key] === undefined || objectToCheck[key] === null || objectToCheck[key] === ""
                || objectToCheck[key] === "Select priority") {;
                alert(`Forgot to enter ${key}`)
                return false;
            }
        }
        return true;
    }

    submitForm(newCardIn, modal) {
        const noItem = document.getElementById("empty");
        if (noItem) {
            noItem.remove();
        }
        if (newCardIn.doctor === "Cardiologist") {
            const visit = new VisitCardiologist(newCardIn);
            visit.render(document.getElementById("container"));
            modal.remove();
        } else if (newCardIn.doctor === "Dentist") {
            const visit = new VisitDentist(newCardIn);
            visit.render(document.getElementById("container"));
            modal.remove();
        } else if (newCardIn.doctor === "Therapist") {
            const visit = new VisitTherapist(newCardIn);
            visit.render(document.getElementById("container"));
            modal.remove();
        }
        location.reload();
    }

    submitEdit(newCardIn, modal) {
        const existCard = [...document.querySelectorAll(".visit")].filter(visit => {
                if (visit.dataset.id === modal.dataset.id) {
                    return visit;
                }
            })[0],
            parent = document.getElementById("container");
        if (newCardIn.doctor === "Cardiologist") {
            const visit = new VisitCardiologist(newCardIn),
                visitNode = visit.render();
            parent.replaceChild(visitNode, existCard);
            modal.remove();
        } else if (newCardIn.doctor === "Dentist") {
            const visit = new VisitDentist(newCardIn),
                visitNode = visit.render();
            parent.replaceChild(visitNode, existCard);
            modal.remove();
        } else if (newCardIn.doctor === "Therapist") {
            const visit = new VisitTherapist(newCardIn),
                visitNode = visit.render();
            parent.replaceChild(visitNode, existCard);
            modal.remove();
        }
        location.reload();
    }
}