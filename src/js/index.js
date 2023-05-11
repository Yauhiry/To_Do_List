import { renderToDo, renderInProgress, renderDone } from './modules/render';

export const currentDate = () => {
  let date = new Date();
  let day = addZero(date.getDate());
  let month = addZero(date.getMonth() + 1);
  let year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
const addZero = (elem) => {
  if (elem < 10) {
    return '0' + elem;
  } else {
    return elem;
  }
};
const $HEADER_DATE = document.querySelector('.header__date');
$HEADER_DATE.textContent = currentDate();

// Popup
const $CREATE_BTN = document.querySelector('.column__btn_create');
const $POPUP = document.querySelector('.popup');
$CREATE_BTN.addEventListener('click', () => {
  $POPUP.classList.add('active');
});

const $CLOSE_POPUP = document.querySelector('#close-popup');
$CLOSE_POPUP.addEventListener('click', (event) => {
  event.preventDefault();
  $POPUP.classList.remove('active');
  clearValue();
});

function clearValue() {
  $INPUT.value = '';
  $AREA.value = '';
}

let toDoTasks = JSON.parse(localStorage.getItem('toDo')) || [];
let progressTasks = JSON.parse(localStorage.getItem('progress')) || [];
let doneTasks = JSON.parse(localStorage.getItem('done')) || [];

// Render
const $TO_DO = document.querySelector('#to-do');
const $IN_PROGRESS = document.querySelector('#progress');
const $DONE = document.querySelector('#done');

const getData = (out, arr, render) => {
  arr.forEach((element, index) => {
    out.innerHTML += render(element, index);
  });
};
getData($TO_DO, toDoTasks, renderToDo);
getData($IN_PROGRESS, progressTasks, renderInProgress);
getData($DONE, doneTasks, renderDone);

//Counter

document.querySelector('#to-do-counter').textContent += toDoTasks.length;
document.querySelector('#progress-counter').textContent += progressTasks.length;
document.querySelector('#done-counter').textContent += doneTasks.length;

// New Task
const $POPUP_FORM = document.querySelector('.popup__form');
const $INPUT = $POPUP_FORM.querySelector('.input');
const $AREA = $POPUP_FORM.querySelector('.area');

function GetData(title, text, date) {
  this.title = title;
  this.text = text;
  this.date = date;
}

function localUpdate() {
  localStorage.setItem('toDo', JSON.stringify(toDoTasks));
  localStorage.setItem('progress', JSON.stringify(progressTasks));
  localStorage.setItem('done', JSON.stringify(doneTasks));
  location.reload();
}

const $NEW_TASK_BTN = document.querySelector('#create-task');
$NEW_TASK_BTN.addEventListener('click', () => {
  toDoTasks.push(new GetData($INPUT.value, $AREA.value, currentDate()));
  $POPUP.classList.remove('active');
  clearValue();
  localUpdate();
});

// //Remove
const $REMOVE_BTN = document.querySelectorAll('.card__btn_del');
$REMOVE_BTN.forEach((element) => {
  element.addEventListener('click', (event) => {
    let targetCard = event.target.closest('.card');
    let idCard = targetCard.dataset.id;
    let statusCard = targetCard.getAttribute('status');
    if (statusCard == 'toDo') {
      toDoTasks.splice(idCard, 1);
    } else if (statusCard == 'inProgress') {
      progressTasks.splice(idCard, 1);
    } else if (statusCard == 'done') {
      doneTasks.splice(idCard, 1);
    }
    localUpdate();
  });
});

const $REMOVE_ALL_BTN = document.querySelectorAll('.column__btn_del');
$REMOVE_ALL_BTN.forEach((element) => {
  element.addEventListener('click', (event) => {
    let parentColumn = event.target.closest('.column');
    localStorage.removeItem(parentColumn.dataset.column);
    location.reload();
  });
});

//Move
const $MOVE_BTN = document.querySelectorAll('#move-btn');
$MOVE_BTN.forEach((element) => {
  element.addEventListener('click', (event) => {
    let cardId = event.target.closest('.card').dataset.id;
    function transfer(arrFrom, arrIn) {
      arrIn.push(arrFrom[cardId]);
      arrFrom.splice(cardId, 1);
    }
    switch (event.target.dataset.btn) {
      case 'progress':
        transfer(toDoTasks, progressTasks);
        break;
      case 'back':
        transfer(progressTasks, toDoTasks);
        break;
      case 'complete':
        transfer(progressTasks, doneTasks);
        break;
      case 'recycle':
        transfer(doneTasks, progressTasks);
        break;
    }
    localUpdate();
  });
});
