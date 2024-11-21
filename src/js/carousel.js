const leftCarouselButton = document.querySelector('.carousel__button_left');
const rightCarouselButton = document.querySelector('.carousel__button_right');
const carouselContainer = document.querySelector('.participants__list');
const carouselCountCurrent = document.querySelector('.carousel__count-current');

let visibleSlides = 1;
let scrollCarouselCounter = visibleSlides;
let timer = null;

const getVisibleSlidesCount = () => {
    if (window.innerWidth >= 1024) {
        return 3;
    } else if (window.innerWidth >= 768) {
        return 2;
    } else {
        return 1;
    }
};

const initializeCarousel = () => {
    visibleSlides = getVisibleSlidesCount();
    scrollCarouselCounter = visibleSlides;
    changeCountCurrent(scrollCarouselCounter);
    controlCarouselButtons();
};

const changeCountCurrent = (counter) => {
    carouselCountCurrent.textContent = counter.toString();
};

const controlCarouselButtons = () => {
    if (scrollCarouselCounter >= 6) {
        disableButton(rightCarouselButton);
    } else if (scrollCarouselCounter <= visibleSlides) {
        disableButton(leftCarouselButton);
    } else {
        activateButton(rightCarouselButton);
        activateButton(leftCarouselButton);
    }
};

const swipeContainer = (side, breakpoint) => {
    if (side === 'right') {
        carouselContainer.scrollLeft += breakpoint;
        scrollCarouselCounter++;
    } else {
        carouselContainer.scrollLeft -= breakpoint;
        scrollCarouselCounter--;
    }
    changeCountCurrent(scrollCarouselCounter);
    controlCarouselButtons();
};

const disableButton = (button) => {
    button.classList.add('carousel__button_disabled');
    button.disabled = true;
};

const activateButton = (button) => {
    if (button.classList.contains('carousel__button_disabled')) {
        button.classList.remove('carousel__button_disabled');
        button.disabled = false;
    }
};

const changeActiveCarouselItem = () => {
    const containerRect = carouselContainer.getBoundingClientRect();
    const items = Array.from(carouselContainer.children);

    const activeItemIndex = items.findIndex((item) => {
        const itemRect = item.getBoundingClientRect();
        return Math.abs(itemRect.left - containerRect.left) < 40;
    });

    if (activeItemIndex !== -1) {
        scrollCarouselCounter = visibleSlides + activeItemIndex;
        changeCountCurrent(scrollCarouselCounter);
        controlCarouselButtons();
    }
};

carouselContainer.addEventListener('scroll', () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        clearTimeout(timer);
        changeActiveCarouselItem();
    }, 100);
});

leftCarouselButton.addEventListener('click', () => swipeContainer('left', 400));
rightCarouselButton.addEventListener('click', () => swipeContainer('right', 400));

window.addEventListener('resize', () => {
    initializeCarousel();
});

initializeCarousel();