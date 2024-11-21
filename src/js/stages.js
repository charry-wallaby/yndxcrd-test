const leftStagesButton = document.querySelector('.stages__button_prev');
const rightStagesButton = document.querySelector('.stages__button_next');
const stagesContainer = document.querySelector('.stages__list');
const stagesStepsList = document.querySelectorAll('.stages__pagination-button');

let scrollStagesIndex = 0;
let timer = null;

const changeActiveStage = (counter) => {
    stagesStepsList.forEach((button) => {
        button.classList.remove('stages__pagination-button_active');
    });

    stagesStepsList[counter].classList.add('stages__pagination-button_active');
};

const controlStagesButtons = () => {
    if (scrollStagesIndex === stagesStepsList.length - 1) {
        disableButton(rightStagesButton);
    } else {
        activateButton(rightStagesButton);
    }

    if (scrollStagesIndex === 0) {
        disableButton(leftStagesButton);
    } else {
        activateButton(leftStagesButton);
    }
};

const disableButton = (button) => {
    button.classList.add('stages__button_disabled');
    button.disabled = true;
};

const activateButton = (button) => {
    if (button.classList.contains('stages__button_disabled')) {
        button.classList.remove('stages__button_disabled');
        button.disabled = false;
    }
};

const swipeContainer = (side, breakpoint) => {
    if (side === 'right') {
        stagesContainer.scrollLeft += breakpoint;
        scrollStagesIndex = Math.min(scrollStagesIndex + 1, stagesStepsList.length - 1);
    } else {
        stagesContainer.scrollLeft -= breakpoint;
        scrollStagesIndex = Math.max(scrollStagesIndex - 1, 0);
    }

    controlStagesButtons();
    changeActiveStage(scrollStagesIndex);
};

const changeActiveStages = () => {
    const containerRect = stagesContainer.getBoundingClientRect();
    const items = Array.from(stagesContainer.children);

    const activeIndex = items.findIndex((item) => {
        const itemRect = item.getBoundingClientRect();
        return Math.abs(itemRect.left - containerRect.left) < 40;
    });

    if (activeIndex !== -1) {
        scrollStagesIndex = activeIndex;
        controlStagesButtons();
        changeActiveStage(scrollStagesIndex);
    }
};

stagesContainer.addEventListener('scroll', () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        clearTimeout(timer);
        changeActiveStages();
    }, 100);
});

leftStagesButton.addEventListener('click', () => swipeContainer('left', 400));
rightStagesButton.addEventListener('click', () => swipeContainer('right', 400));