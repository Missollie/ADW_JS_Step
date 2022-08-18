const container = document.getElementById("container");

container.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

container.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

container.addEventListener(`dragover`, (evt) => {
  // Zulassen, dass Gegenstände in diesen Bereich gelangen/Дозвіл на надходження елементів в цю область / Allow dropping items in this area
  evt.preventDefault();

  // Wir finden das verschobene Element/Находимо елемент, що змістили/ Finding the moved element
  const activeElement = container.querySelector(`.selected`);
  // Знаходимо елемент, над яким в данний момент знаходиться курсор 
  // Find the element the cursor is currently over
  const currentElement = evt.target;
  //Wir prüfen, ob das Event funktioniert hat
  // Перевіряємо, що подія спрацювала: / Check if the event fired:
  // 1. nicht auf dem Element, das wir verschoben haben/не на тому елементі, який ми змістили / not on the element we are moving,
  // 2. genau auf dem Listeneintrag/саме на елементі списку/ on the list element
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`visit`);

  //Wenn nicht, beenden wir die Ausführung der Funktion/ Якщо ні, закінчуємо виконання ф-ції / If not, we abort the execution of the function
  if (!isMoveable) {
    return;
  }

  //Wir finden das Element, vor dem wir einfügen werden/Знаходимо елемент, перед яким будемо вставляти / Find the element before which we will insert
  const nextElement = (currentElement === activeElement.nextElementSibling) ?
    currentElement.nextElementSibling :
    currentElement;

  // Füge activeElement vor nextElement ein/Вставляємо activeElement перед nextElement / Insert activeElement before nextElement
  container.insertBefore(activeElement, nextElement);
});