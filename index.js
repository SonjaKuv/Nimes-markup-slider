'use strict';

const photoList = Array.from(document.querySelectorAll('.photos__item'));
const arrows = Array.from(document.querySelectorAll('.photos__arrow'));
const rightArrow = document.querySelector('.photos__arrow_type_right');
const leftArrow = document.querySelector('.photos__arrow_type_left');
let now, next;

const arrowClickHandler = (evt) => {
    now = +document.querySelector('.photos__item_type_big').dataset.order;
    evt.currentTarget.classList.contains('photos__arrow_type_right') ? next = now + 1 : next = now - 1;
    changeArrowVisibility(photoList[next], evt);
    switchOrder(photoList[now], photoList[next]);
};

const photoClickHandler = (evt) => {
    now = +document.querySelector('.photos__item_type_big').dataset.order;
    changeArrowVisibility(evt.target, evt);
    switchOrder(photoList[now], evt.target);
};

const changeArrowVisibility = (nextItem, evt) => {
    const nextOrder = +nextItem.style.order;
    if ((evt.currentTarget == rightArrow && nextOrder == photoList.length - 1) || (evt.currentTarget == leftArrow && nextOrder == 1)) {
        disableArrow(evt.currentTarget);
    } else {
        arrows.forEach((arrow) => undisableArrows(arrow));
    }
}

const undisableArrows = (arrow) => {
    arrow.classList.remove('photos__arrow_disabled');
    arrow.addEventListener('click', arrowClickHandler);
};

const disableArrow = (currentArrow) => {
    currentArrow.classList.add('photos__arrow_disabled'); 
    currentArrow.removeEventListener('click', arrowClickHandler);
};

const switchOrder = (currentItem, nextItem) => {
    currentItem.classList.remove('photos__item_type_big');
    currentItem.style.order = nextItem.style.order;
    nextItem.classList.add('photos__item_type_big');
};

rightArrow.addEventListener('click', arrowClickHandler);
photoList.forEach((photo) => photo.addEventListener('click', photoClickHandler));