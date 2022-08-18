import { getCards } from "../modal/ajax.js";
import {VisitCardiologist, VisitDentist, VisitTherapist } from "./Visit.js";

// Funktion zum Anzeigen von Bildern von Besuchen, die sich auf dem Server befinden
//Function for rendering visit cards located in the server
export function renderCards(container, token) {

 //Abrufen einer Reihe von Treffern vom Server
    // Отримання масиву візитів із сервера/getting an array of visits from the server
    getCards(token).then(c => c.json())

        .then(arrVisitsFromServer => {

            // Zeigen Sie eine Nachricht an, wenn der Besuch nicht geplant ist/Вивід повідомлення, якщо візит не запланований / Display a message if no visits are scheduled
            if (arrVisitsFromServer.length === 0) {
                const noItem = document.createElement('p');
                noItem.innerText = "No item has been added";
                noItem.id = "empty";
                container.append(noItem);
            } else {

                //Erstellen einer Reihe von Karten/Створення масиву карток / Creating an array of cards
                let visitsObjects = arrVisitsFromServer.map(visit => {
                    if (visit.content.doctor === "Dentist") {

                        const visitCard = new VisitDentist(visit);

                        // Karten im DOM ziehen/відмалювання карток в DOM / drawing a card in DOM
                        visitCard.render(container);
                        return visitCard;
                    } else if (visit.content.doctor === "Cardiologist") {
                        const visitCard = new VisitCardiologist(visit);
                        visitCard.render(container);
                        return visitCard;
                    } else if (visit.content.doctor === "Therapist") {
                        const visitCard = new VisitTherapist(visit);
                        visitCard.render(container);
                        return visitCard;
                    }
                });
                return visitsObjects;
            }
        });
}