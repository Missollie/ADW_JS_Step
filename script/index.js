// const btnAuth = document.getElementById("btnAuth");
// const modalWrapper = document.getElementById("modalWrapper");
// const btnSubmitLogIn = document.getElementById("btnSubmitLogIn");
// const authError = document.getElementById('authError');
// const btnCreateCard = document.getElementById('btnCreateCard');
// const main = document.getElementById('main');

let cardsList = [];
class API {
  constructor() {
    this._token = "483740eb-f28b-4d9d-967b-7141fa43f968";
    this._baseUrl = "https://ajax.test-danit.com/api/v2/";
  }

  async request(method, url, body) {
    const response = await fetch(this._baseUrl + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error("Error");
    }

    return response;
  }

  get(url) {
    return this.request("GET", url);
  }

  delete(url) {
    return this.request("DELETE", url);
  }

  post(url, body) {
    return this.request("POST", url, body);
  }
}

class Authorization extends API {
  async login(body) {
    const response = await super.post("cards/login", body);

    return await response.text();
  }
}

class Modal {
  constructor() {
    this.root = document.body;
  }

  handleClickCloseModal(e) {
    e.preventDefault();
    document.getElementById("modalWrapper").classList.add("hidden-element");
    if (
      document.getElementById("btnAuth").classList.contains("hidden-element")
    ) {
      document.getElementById("btnAuth").classList.remove("hidden-element");
    }
  }

  renderModal(childContext) {
    const modalWrapper = document.createElement("div");
    modalWrapper.setAttribute("id", "modalWrapper");
    modalWrapper.classList.add("hidden-element", "modal-wrapper");
    modalWrapper.textContent = "Modal modal";
    const closeBtnModal = document.createElement("button");
    closeBtnModal.innerHTML = "close";
    const modalContext = childContext;
    closeBtnModal.addEventListener("click", this.handleClickCloseModal);
    modalWrapper.append(modalContext);
    modalWrapper.appendChild(closeBtnModal);
    this.root.appendChild(modalWrapper);
  }
}
class ModalAuthorization extends Modal {
  renderModalAuthorization() {
    const modalAuthorization = document.createElement("form");
    modalAuthorization.classList.add("modal");
    modalAuthorization.setAttribute("id", "authModal");
    modalAuthorization.innerHTML = `
      <input required id='authEmail' type='email' placeholder="enter email"/>
      <input required id='authPassword' type='password' placeholder="enter password"/>
      <button id="btnSubmitLogIn">submit</button>
      <div id="authError" class="error hidden-element">Incorrect username or password</div>
    `;
    super.renderModal(modalAuthorization);
  }
}

class Cards extends API {
  async getCards() {
    const response = await super.get('cards');

    return await response;
  }
}

const cards = new Cards();
// console.log(cards.getCards());

const modal = new ModalAuthorization();
modal.renderModalAuthorization();

const btnAuth = document.getElementById("btnAuth");
const modalWrapper = document.getElementById("modalWrapper");
const btnSubmitLogIn = document.getElementById("btnSubmitLogIn");
const authError = document.getElementById("authError");
const btnCreateCard = document.getElementById("btnCreateCard");
const main = document.getElementById("main");

btnAuth.addEventListener("click", handleClickShowAuthModal);
btnSubmitLogIn.addEventListener("click", handleClickLogIn);

const auth = new Authorization();

function handleClickShowAuthModal() {
  btnAuth.classList.add("hidden-element");
  modalWrapper.classList.remove("hidden-element");
  // modal.renderModalAuthorization()
}

async function handleClickLogIn(e) {
  e.preventDefault();
  try {
    await auth.login({ email: authEmail.value, password: authPassword.value });
    modalWrapper.classList.add("hidden-element");
    btnAuth.classList.add("hidden-element");
    btnCreateCard.classList.remove("hidden-element");
    main.classList.remove("hidden-element");
    cardsList = (await cards.getCards()).json()
    console.log(cardsList);
  } catch (error) {
    authError.classList.remove("hidden-element");
    console.error(error);
  }
}
