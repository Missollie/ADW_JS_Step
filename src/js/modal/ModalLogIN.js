//registered token by login/password:
//логін  melisa1671@gmail  Thister45@dayrep.com
//пароль 1234              1111
//3dfb076c-2ac8-4619-96f7-d8bc6f59b84b
//-----------------------------------------
//melisa16@ukr.net melisa16
//melisa16
//29227ad6-1481-49e3-b3a2-d388c1d788e3
import Modal from './Modal.js';
import { getLogin } from './ajax.js';
import { renderCards } from '../cards/cards.js';


//Wir erstellen einen Container zum Platzieren von Karten im DOM
// Створюємо контейнер для розміщення карток в DOM / Create a container for placing cards in the DOM
const container = document.getElementById('container');
export let token = sessionStorage.getItem('token');
const btnLog = document.querySelector('.header__btn');
btnLog.addEventListener('click', createModal);


//Sichtbarkeitsfunktion des LOGIN-Buttons, bei Erhalt des Tokens wird der Button ausgeblendet
// Функція видимості кнопки LOGIN, якщо отриманий токен, кнопка приховується | Visibility function of the LOGIN button, if a token is received, the button is hidden
window.onload = function () {
  if (token) {
    btnLog.remove();
    document.querySelector('.header__btn-create').removeAttribute('hidden');
  } else {
    btnLog.removeAttribute('hidden');
  }
};

//Modale Fensterklasse für die Autorisierung
// Клас модального вікна для авторизації / Modal window class for authorization
class ModalLogIN extends Modal {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
    this.element.title = document.createElement('p');
    this.element.email = document.createElement('input');
    this.element.password = document.createElement('input');
  }

  //Wir zeichnen ein modales Fenster im DOM
  // Відмальовуємо модальне вікно в DOM / Draw a modal window in the DOM
  render() {
    super.render();
    this.element.email.type = 'email';
    this.element.password.type = 'password';
    this.element.email.placeholder = 'Login';
    this.element.password.placeholder = 'Password';
    this.element.title.textContent = 'Entrance';
    this.element.email.className = 'header__modal-input';
    this.element.password.className = 'header__modal-input';
    this.element.title.className = 'header__modal-text';
    this.element.modalWindow.append(this.element.btnClose, this.element.title, this.element.email, this.element.password, this.element.btnSubmit);


//Ereignishandler für die Autorisierungsschaltfläche, der die Übereinstimmung mit dem geflashten Token überprüft
// Обробник події на кнопку авторизації, перевірка на відповідність прошитому токену 
//The handler for the authorization button, checking for compliance with the flashed token
this.element.btnSubmit.addEventListener('click',  async () => {
  try {
    const response = await getLogin(this.element.email.value, this.element.password.value);

    if(!response.ok) throw new Error();
    
    const data = await response.text();
    sessionStorage.setItem('token', data);
    token = data;
    this.element.modalWrapper.remove();
    btnLog.remove();
    document.querySelector('.header__btn-create').removeAttribute('hidden');


//Karten, die vom Server empfangen werden, werden auf die Seite gezeichnet
 // карточки, отримані з серверу, відмальовуємо на сторінку 
 // cards received from the server are drawn onto the page
    renderCards(container, token);
  } catch {
    alert('Incorrect login/password! Try again and type right date.');
  }
});
}
}


//Die Funktion zum Erstellen einer Instanz und zum Starten des Neuzeichnens des Autorisierungsfensters
// Ф-ція створення інстансу і запуску відмалювання вікна авторизації 
//The function of creating an instance and launching the rendering of the authorization window
function createModal() {
  let modalLog = new ModalLogIN();
  modalLog.render();
}
