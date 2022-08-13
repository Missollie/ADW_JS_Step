class API {
  constructor() {
    this._token = "483740eb-f28b-4d9d-967b-7141fa43f968";
    this._baseUrl = "https://ajax.test-danit.com/api/v2/cards/";
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

    if(!response.ok) {
      throw new Error('Error');
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
    const response = await super.post("login", body);

    return await response.text();
  }
}

const btnAuth = document.getElementById("btnAuth");
const authModal = document.getElementById("authModal");
const btnSubmitLogIn = document.getElementById("btnSubmitLogIn");
const authError = document.getElementById('authError');
const btnCreateCard = document.getElementById('btnCreateCard')

btnAuth.addEventListener("click", handleClickShowAuthModal);
btnSubmitLogIn.addEventListener("click", handleClickLogIn);

const auth = new Authorization();

function handleClickShowAuthModal() {
  btnAuth.classList.add("hidden-element")
  authModal.classList.remove("hidden-element");
}

async function handleClickLogIn() {
  try{
    await auth.login({ email: authEmail.value , password: authPassword.value });
    authModal.classList.add('hidden-element');
    btnAuth.classList.add('hidden-element');
    btnCreateCard.classList.remove('hidden-element')
  } catch(error) {
    authError.classList.remove('hidden-element')
    console.error(error);
  }
}
