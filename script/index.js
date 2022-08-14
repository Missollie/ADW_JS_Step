class API {
  constructor() {
    this.token;
    this._baseUrl = "https://ajax.test-danit.com/api/v2/";
  }

  setToken(token) {
    this.token = token;btnAuth
  }

  async request(method, url, body) {
    const response = await fetch(this._baseUrl + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token ? `Bearer ${this.token}` : undefined,
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

class Authorization {
  constructor(api) {
    this.api = api;
  }

  async login(body) {
    const response = await this.api.post("cards/login", body);
    const token = await response.text();
    this.api.setToken(token);

    return token;
  }
}

class Cards {
  constructor(api) {
    this.api = api;
    this.cardsList = [];
  }

  async getCards() {
    const response = await this.api.get("cards");
    const data = await response.json();
    this.cardsList = data;
    this.render()
    return data;
  }

  // async postCards() {
  //   return await this.api.post("cards", {
  //     title: "test test1",
  //     fio: "petro petrov",
  //     fullName: 'petro petrov',
  //     firtsName: 'pertov',
  //     lastName: 'petrov',
  //     description: "Плановый визит",
  //     doctor: "Therapist",
  //     bp: "24",
  //     age: 23,
  //     weight: 70,
  //   });
  // }

  render() {
    const cards = [];
    this.cardsList.forEach((card) => {
      const cardItem = document.createElement("div");
      cardItem.classList.add('card')
      cardItem.innerHTML = `
        <div>${card.fullName}</div>
        <div>${card.doctor}</div>
        <button>show more</button>
        <button>change info</button>
        <button>delete cart</button>
      `;
      
      document.getElementById("cardsWrapper").appendChild(cardItem)
    });

  }
}

class Modal {
  constructor(modalName) {
    this.modalName = modalName;
    this.root = document.body;
  }

  handleClickCloseModal = (e) => {
    e.preventDefault();
    document.getElementById("modalWrapper").classList.add("hidden-element");

    if (this.modalName === "Authorization") {
      document.getElementById("btnAuth").classList.remove("hidden-element");
    }
  };

  render(childContext) {
    const modalWrapper = document.createElement("div");
    modalWrapper.setAttribute("id", "modalWrapper");
    modalWrapper.classList.add("hidden-element", "modal-wrapper");
    modalWrapper.textContent = "Login";
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
  constructor(modalName) {
    super(modalName);
    this.modalName = modalName;
    this.root = document.body;
  }

  render() {
    const modalAuthorization = document.createElement("form");
    modalAuthorization.classList.add("modal");
    modalAuthorization.setAttribute("id", "authModal");
    modalAuthorization.innerHTML = `
    <div class="center">
    <h1>Login</h1>
 
      <div class="txt_field"> 
      <input required id='authEmail' type='email'  placeholder=""> 
      <label>Username</label> </input>
      </div> 
      <div class="txt_field"> <input required id='authPassword' type='password' placeholder=""/> 
      <label>Password</label></div>   
      <div class="pass">Forgot Password?</div> 

     <input id="btnSubmitLogIn" type="submit" value="Login" ></input>

      <div id="authError" class="error hidden-element">Incorrect username or password</div>
      <div class="signup_link">
      Not a member? <a href="#">Signup</a>
    
    </div>`;
    super.render(modalAuthorization);
  }
}

const api = new API();
const cards = new Cards(api);
const auth = new Authorization(api);
new ModalAuthorization("Authorization").render();

const btnAuth = document.getElementById("btnAuth");
const modalWrapper = document.getElementById("modalWrapper");
const btnSubmitLogIn = document.getElementById("btnSubmitLogIn");
const authError = document.getElementById("authError");
const btnCreateCard = document.getElementById("btnCreateCard");
const main = document.getElementById("main");

btnAuth.addEventListener("click", handleClickShowAuthModal);
btnSubmitLogIn.addEventListener("click", handleClickLogIn);

function handleClickShowAuthModal() {
  btnAuth.classList.add("hidden-element");
  modalWrapper.classList.remove("hidden-element");
}

async function handleClickLogIn(e) {
  e.preventDefault();
  try {
    await auth.login({ email: authEmail.value, password: authPassword.value });
    modalWrapper.classList.add("hidden-element");
    btnAuth.classList.add("hidden-element");
    btnCreateCard.classList.remove("hidden-element");
    main.classList.remove("hidden-element");
    await cards.getCards();
  } catch (error) {
    authError.classList.remove("hidden-element");
  }
}
