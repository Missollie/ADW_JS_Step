
//3dfb076c-2ac8-4619-96f7-d8bc6f59b84b
//------------------------------------
// Файл з fetch-запитами для авторизації getLogin, створення карток createCard, 
// File with fetch requests for getLogin authorization, createCard creation,
//удаления карт deleteCard, редактирования карт editCard, / delete cards delete Card, edit cards editCard,
//получения масссива карт getCards / getting an array of cards getCards
//-----------------------------------
//Authorization: Bearer ${3dfb076c-2ac8-4619-96f7-d8bc6f59b84b}
import {token} from "./ModalLogIN.js";

export const API = 'https://ajax.test-danit.com/api/v2/cards';


export function getLogin(email, password) {
    return fetch(`${API}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
}

export function createCard(card) {
    return fetch(`${API}`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(card)
    })
}

export function deleteCard(id) {
    return fetch(`${API}/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

export function editCard(newCard, cardId) {
    return fetch(`${API}/${cardId}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCard)
    })
}

export function getCards(newToken) {
    return fetch(`${API}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || newToken}`
        }
    })
}
