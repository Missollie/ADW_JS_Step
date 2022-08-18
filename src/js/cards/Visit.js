import ModalForm from "../modal/ModalForm.js";
import {deleteCard} from "../modal/ajax.js";

//Erstellung der Hauptklasse von Karten / Створення основного классу карточок /Creating the main card class
export class Visit {
    constructor(visit) {
        this.id = visit.id;
        this.doctor = visit.content.doctor;
        this.purpose = visit.content.purpose;
        this.desc = visit.content.desc;
        this.priority = visit.content.priority;
        this.fullName = visit.content.fullName;
        this.elem = {
            self: document.createElement("div"),
            fullName: document.createElement("h3"),
            doctor: document.createElement("span"),
            priority: document.createElement("span"),
            purpose: document.createElement("span"),
            desc: document.createElement("p"),
            showMoreBtn: document.createElement("button"),
            hideBtn: document.createElement("button"),
            editBtn: document.createElement("button"),
            deleteBtn: document.createElement("button")
        };
    }

    //Anzeigen von Bildern auf der Hauptseite / Відображення карточок на основній сторінці / Displaying cards on the main page
    render(parent) {
        this.elem.fullName.textContent = this.fullName;
        this.elem.doctor.textContent = `Doctor: ${this.doctor}`;
        this.elem.priority.textContent = `Urgency: ${this.priority}`;
        this.elem.purpose.textContent = `The purpose of the visit: ${this.purpose}`;
        this.elem.desc.textContent = `Brief description of the visit: ${this.desc}`;
        this.elem.showMoreBtn.textContent = "Show";
        this.elem.hideBtn.textContent = "Hide";
        this.elem.hideBtn.style.display = 'none';
        this.elem.editBtn.textContent = "Edit";
        this.elem.deleteBtn.textContent = "X";

        this.elem.self.classList.add("visit");
        this.elem.fullName.classList.add("visit__head");
        this.elem.doctor.classList.add("visit__text");
        this.elem.priority.classList.add("visit__text");
        this.elem.purpose.classList.add("visit__text");
        this.elem.desc.classList.add("visit__text");
        this.elem.showMoreBtn.classList.add("visit__btn");
        this.elem.hideBtn.classList.add("visit__btn");
        this.elem.editBtn.classList.add("visit__btn-edit");
        this.elem.deleteBtn.classList.add("visit__btn-delete");

        this.elem.self.draggable = true;
        this.elem.self.dataset.id = this.id;

        //Bildbearbeitungstaste / Кнопка редагування карточок/ Card edit button
        this.elem.editBtn.addEventListener("click", async (event) => {
            const form = new ModalForm();
            event.target.value = event.target.childNodes[0].outerText;
            form.ifEditModal(this.id);
            const {doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit} = this;
            form.edit(doctor, purpose, desc, priority, age, id, pressure, weightIndex, heartIllness, fullName, lastDateVisit);
            form.render();
            document.querySelectorAll(".form__select")[1].remove()
        });

        //Schaltfläche zum Löschen der Karte / Кнопка видалення карточки / Card delete button
        this.elem.deleteBtn.addEventListener("click", async (event) => {
            
            const response = await deleteCard(this.id);

            if (response.status === "Success") {
                this.elem.self.remove();
                const renderedVisits = document.querySelectorAll(".visit");
                if (!renderedVisits || renderedVisits.length === 0) {
                    const noItem = document.createElement('p');
                    noItem.id = "empty";
                    noItem.textContent = "No item has been added";
                    parent.append(noItem);
                }
            }
            location.reload();
        });
        this.elem.self.append(this.elem.fullName, this.elem.doctor, this.elem.showMoreBtn, this.elem.hideBtn, this.elem.editBtn, this.elem.deleteBtn);
    }
}

//Kinderklasse Zahnarzt / Дочерний класс Дантист | Child class Dentist
export class VisitDentist extends Visit {
    constructor(visit) {
        super(visit);
        this.lastDateVisit = visit.content.lastDateVisit;
    }

//Zeichnung eines Zahnarztes auf der Hauptseite / Відображення Дантиста на головній сторінці | Dentist drawing on the main page
    render(parent) {
        super.render(parent);
        this.elem.lastDateVisit = document.createElement("span");

        this.elem.lastDateVisit.textContent = `Date of last visit: ${this.lastDateVisit}`;

        this.elem.lastDateVisit.classList.add("visit__text");

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });

        if (parent) {
            parent.append(this.elem.self);
        } else {
            return this.elem.self;
        }
    }

//Schaltfläche zur Anzeige zusätzlicher Informationen des "Zahnarztes" / Кнопка для відображення додаткової інформації дантиста | Button for drawing additional information Dentist
    showMore() {
        const moreInfo = [];

        for (let key in this.elem) {
            if (key === "purpose" || key === "desc" || key === "priority" || key === "lastDateVisit") {
                moreInfo.push(this.elem[key]);
            }
        }

        moreInfo.forEach(item => {
            this.elem.self.insertBefore(item, this.elem.showMoreBtn);
        });

        this.elem.showMoreBtn.style.display = 'none';
        this.elem.hideBtn.style.display = 'inline-block';
    }

//Schaltfläche zum Ausblenden von Zahnarztinformationen / Кнопка для приховання інформації дантиста / Button to hide Dentist information
    hide() {
        this.elem.self.removeChild(this.elem.purpose);
        this.elem.self.removeChild(this.elem.desc);
        this.elem.self.removeChild(this.elem.priority);

        this.elem.self.removeChild(this.elem.lastDateVisit);
        this.elem.hideBtn.style.display = 'none';
        this.elem.showMoreBtn.style.display = 'inline-block';
    }
}

//Klassentherapeutin für Kinder / Дочірній клас Терапевт / Child class Therapist
export class VisitTherapist extends Visit {
    constructor(visit) {
        super(visit);
        this.age = visit.content.age;
    }

//Zeichnung des "Therapeuten" auf der Hauptseite / Відмалювання Терапевта на головній сторінці / Drawing Therapist on the main page
    render(parent) {
        super.render(parent);
        this.elem.age = document.createElement("span");

        this.elem.age.textContent = `Age: ${this.age}`;

        this.elem.age.classList.add("visit__text");

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });

        if (parent) {
            parent.append(this.elem.self);
        } else {
            return this.elem.self;
        }
    }

//Schaltfläche zur Anzeige zusätzlicher Informationen "des Zahnarztes" / Кнопка для відображення додаткової інформації дантиста / Button for drawing additional information Dentist
    showMore() {
        const moreInfo = [];

        for (let key in this.elem) {
            if (key === "purpose" || key === "desc" || key === "priority" || key === "age") {
                moreInfo.push(this.elem[key]);
            }
        }

        moreInfo.forEach(item => {
            this.elem.self.insertBefore(item, this.elem.showMoreBtn);
        });

        this.elem.showMoreBtn.style.display = 'none';
        this.elem.hideBtn.style.display = 'inline-block';
    }

//Schaltfläche zum Ausblenden von Therapeuteninformationen / Кнопка для приховання інформації Терапевта / Button to hide Therapist information
    hide() {
        this.elem.self.removeChild(this.elem.purpose);
        this.elem.self.removeChild(this.elem.desc);
        this.elem.self.removeChild(this.elem.priority);
        this.elem.self.removeChild(this.elem.age);
        this.elem.hideBtn.style.display = 'none';
        this.elem.showMoreBtn.style.display = 'inline-block';
    }
}

//Kinderklasse des Kardiologen / Дочірній клас Кардіолога / Child class of Cardiologist
export class VisitCardiologist extends Visit {
    constructor(visit) {
        super(visit);
        this.pressure = visit.content.pressure;
        this.weightIndex = visit.content.weightIndex;
        this.heartIllness = visit.content.heartIllness;
        this.age = visit.content.age;
    }

//Eine Zeichnung eines Kardiologen auf der Hauptseite / Відмальовка кардіолога на головній сторінці / Drawing of the Cardiologist on the main page
    render(parent) {
        super.render(parent);
        this.elem.pressure = document.createElement("span");
        this.elem.weightIndex = document.createElement("span");
        this.elem.heartIllness = document.createElement("span");
        this.elem.age = document.createElement("span");

        this.elem.pressure.textContent = `Pressure: ${this.pressure}`;
        this.elem.weightIndex.textContent = `Body mass index: ${this.weightIndex}`;
        this.elem.heartIllness.textContent = `Previously suffered heart diseases: ${this.heartIllness}`;
        this.elem.age.textContent = `Age: ${this.age}`;

        this.elem.pressure.classList.add("visit__text");
        this.elem.weightIndex.classList.add("visit__text");
        this.elem.heartIllness.classList.add("visit__text");
        this.elem.age.classList.add("visit__text");

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });

        if (parent) {
            parent.append(this.elem.self);
        } else {
            return this.elem.self;
        }
    }

//Schaltfläche zum Abrufen zusätzlicher Informationen des Kardiologen / Кнопка для відображення додаткової інформації Кардіолога  / Button for drawing additional information of the Cardiologist
    showMore() {
        const moreInfo = [];

        for (let key in this.elem) {
            if (key === "purpose" || key === "desc" || key === "priority" || key === "pressure" || key === "weightIndex" || key === "heartIllness" || key === "age") {
                moreInfo.push(this.elem[key]);
            }
        }

        moreInfo.forEach(item => {
            this.elem.self.insertBefore(item, this.elem.showMoreBtn);
        });

        this.elem.showMoreBtn.style.display = 'none';
        this.elem.hideBtn.style.display = 'inline-block';
    }

//Schaltfläche zum Ausblenden von Kardiologeninformationen / Кнопка для приховання інформації кардіолога / Button to hide information Cardiologist
    hide() {
        this.elem.self.removeChild(this.elem.purpose);
        this.elem.self.removeChild(this.elem.desc);
        this.elem.self.removeChild(this.elem.priority);
        this.elem.self.removeChild(this.elem.pressure);
        this.elem.self.removeChild(this.elem.weightIndex);
        this.elem.self.removeChild(this.elem.heartIllness);
        this.elem.self.removeChild(this.elem.age);
        this.elem.hideBtn.style.display = 'none';
        this.elem.showMoreBtn.style.display = 'inline-block';
    }
}