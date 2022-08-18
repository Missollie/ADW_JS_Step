// Створюємо базову модальну форму / Creating a basic modal form
export default class Modal {
    constructor() {
        this.element = {
            modalWrapper: document.createElement('div'),
            modalWindow: document.createElement('div'),
            btnClose: document.createElement('span'),
            btnSubmit: document.createElement('button'),
        };
    }

// Відмалювання модальної форми в header / Draw a modal form in the header
    render() {
        const parent = document.querySelector('.header');
        const modalWrapper = this.element.modalWrapper;
        const btnClose = this.element.btnClose;
        btnClose.innerHTML = "&times;";
        this.element.btnSubmit.type = 'submit';
        this.element.btnSubmit.textContent = 'Увійти';
        modalWrapper.className = 'header__modal-wrapper';
        this.element.modalWindow.className = 'header__modal';
        this.element.btnSubmit.className = 'header__btn-submit';
        btnClose.className = 'header__modal-close';
        this.element.modalWindow.append(btnClose, this.element.btnSubmit);
        modalWrapper.append(this.element.modalWindow);
        parent.append(modalWrapper);

// Обробка за межами модального вікна або на btnClose , видалити модальну форму 
// A handler outside the modal window or on btn Close , removes the modal form
        document.addEventListener('click', (event) => {
            if (event.target === modalWrapper || event.target === btnClose) {
                modalWrapper.remove();
            }

        });
    }
}