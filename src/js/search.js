import {getCards} from "./modal/ajax.js";
import {VisitCardiologist, VisitDentist, VisitTherapist} from "./cards/Visit.js";

const container = document.getElementById("container");

export function search(formContainer, visitContainer) {

   const searchWrap = document.createElement('form');
   const searchInput = document.createElement('input');
   const doctorInput = document.createElement('select');
   const doctorInput1 = document.createElement('option');
   const doctorInput2 = document.createElement('option');
   const doctorInput3 = document.createElement('option');
   const doctorInput4 = document.createElement('option');
   const priorityInput = document.createElement('select');
   const priorityInput1 = document.createElement('option');
   const priorityInput2 = document.createElement('option');
   const priorityInput3 = document.createElement('option');
   const priorityInput4 = document.createElement('option');
   const buttonInput = document.createElement('input');

   searchInput.placeholder = "Research";
   doctorInput1.innerText = "Choose a doctor";
   doctorInput2.innerText = "Therapist";
   doctorInput3.innerText = "Dentist";
   doctorInput4.innerText = "Cardiologist";
   doctorInput.append(doctorInput1, doctorInput2, doctorInput3, doctorInput4);

   priorityInput1.innerText = "Select the urgency";
   priorityInput2.innerText = "Ordinary";
   priorityInput3.innerText = "Priority";
   priorityInput4.innerText = "Urgent";
   priorityInput.append(priorityInput1, priorityInput2, priorityInput3, priorityInput4);

   buttonInput.type = "button";
   buttonInput.value = "Research";
   searchWrap.className = 'section__form-wrapper';
   searchInput.className = 'section__form-search';
   doctorInput.className = 'section__form-select';
   priorityInput.className = 'section__form-select';
   buttonInput.className = "section__form-btn";

   searchWrap.addEventListener('submit', (e) => {
      e.preventDefault();
      getAndRender();
   });
   searchWrap.append(searchInput, doctorInput, priorityInput, buttonInput);
   formContainer.prepend(searchWrap);

   function getAndRender() {
      visitContainer.innerText = "";
      const visits = getVisits(); 
      //Holen Sie sich Daten vom Server und verwandeln Sie sie in ein Array von Objekten, die zum Rendern bereit sind
      // отримати дані з сервера та перетворити їх на масив готових для рендеру об'єктів
      //get data from the server and convert it into an array of renderable objects
      visits.then(cards => {
         let cardsSearch = cards.filter(visit => {
            if (visit) {
               let searchContent = visit.purpose + " " + visit.fullName;
               if (searchContent.toLowerCase().includes(searchInput.value.toLowerCase()))
                  if (doctorInput.value === "Choose a doctor" && priorityInput.value === "Select the urgency")
                     return true;
                  else
                     return (doctorInput.value === visit.doctor && priorityInput.value === visit.priority) || (doctorInput.value === "Choose a doctor" && priorityInput.value === visit.priority) || (priorityInput.value === "Select the urgency" && doctorInput.value === visit.doctor);
            }
         });
         cardsSearch.forEach((item) => item.render(visitContainer));
      })
   }

   buttonInput.addEventListener('click', (e) => {
      getAndRender();
   })
}


//wir erhalten Daten mit bestehenden Besuchen vom Server
// отримуємо дані з існуючими візитами із сервера /get data with existing visits from the server
export function getVisits() {
   return getCards().then(c => c.json())
      .then(visits => {
         if (visits !== undefined) {

//Platzieren Sie Visitenkarten in der gewünschten Anordnung          
// поміщаємо картки візитів у потрібний масив / put the visit cards in the required array
            return visits.map(visit => {
               if (visit.content.doctor === "Dentist") {
                  return new VisitDentist(visit);
               } else if (visit.content.doctor === "Cardiologist") {
                  return new VisitCardiologist(visit);
               } else if (visit.content.doctor === "Therapist") {
                  return new VisitTherapist(visit);
               }
            });
         }
      });
}