function renderToDo(el, id) {
  return `
  <div class="card todo-card" data-id="${id}" status="toDo">
  <h3 class="card__title">${el.title}</h3>
  <div class="card__text">
    <p>${el.text}</p>
  </div>
  <div class="card__info">
    <div class="card__date">${el.date}</div>
    <div class="card__control">
        <i class="fa-solid fa-person-digging card__btn card__btn_to-progress" id="move-btn" data-btn="progress"></i>
        <i class="fa-solid fa-xmark card__btn card__btn_del" data-btn="delete"></i>
    </div>
  </div>
</div>
  `;
}

function renderInProgress(el, id) {
  return `
  <div class="card progress-card" data-id="${id}" status="inProgress">
  <h3 class="card__title">${el.title}</h3>
    <div class="card__text">
      <p>${el.text}</p>
    </div>
    <div class="card__info">
      <div class="card__date">${el.date}</div>
      <div class="card__control">
          <i class="fa-solid fa-arrow-left card__btn card__btn_back" id="move-btn" data-btn="back"></i>
          <i class="fa-solid fa-check card__btn card__btn_complete" id="move-btn" data-btn="complete"></i>
          <i class="fa-solid fa-xmark card__btn card__btn_del" data-btn="delete"></i>
      </div>
    </div>
  </div>
  `;
}

function renderDone(el, id) {
  return `
  <div class="card done-card" data-id="${id}" status="done">
    <h3 class="card__title">${el.title}</h3>
    <div class="card__text">
    <p>${el.text}</p>
    </div>
    <div class="card__info">
      <div class="card__date">${el.date}</div>
      <div class="card__control">
        <i class="fa-solid fa-arrow-left card__btn card__btn_recycle" id="move-btn" data-btn="recycle"></i>
        <i class="fa-solid fa-xmark card__btn card__btn_del" data-btn="delete"></i>
      </div>
    </div>
  </div>
  `;
}

export { renderToDo, renderInProgress, renderDone };
