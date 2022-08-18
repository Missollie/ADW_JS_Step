// import {token} from "./ModalLogIN.js";

// export const API = 'https://ajax.test-danit.com/api/cards/';

// export function getLogin(email, password) {
//     return fetch(`${API}login`, {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: email,
//             password: password
//         })
//     })
// }

// export function createCard(card) {
//     return fetch(`${API}`, {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(card)
//     })
// }

// export function deleteCard(id) {
//     return fetch(`${API}${id}`, {
//         method: "DELETE",
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     })
// }

// export function editCard(newCard, cardId) {
//     return fetch(`${API}/${cardId}`, {
//         method: "PUT",
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(newCard)
//     })
// }

// export function getCards() {
//     return fetch(`${API}`, {
//         method: "GET",
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     })
// }