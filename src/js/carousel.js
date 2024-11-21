const leftCarouselButton = document.querySelector('.carousel__button_left');
const rightCarouselButton = document.querySelector('.carousel__button_right');
const carouselContainer = document.querySelector('.participants__list');
const carouselCountCurrent = document.querySelector('.carousel__count-current');

let visibleSlides = 1; // Количество видимых слайдов
let scrollCarouselCounter = 0; // Индекс первого видимого слайда
let totalSlides = 6; // Общее количество слайдов
let autoScrollTimer = null; // Таймер для автопрокрутки

const getVisibleSlidesCount = () => {
    if (window.innerWidth >= 1024) {
        return 3; // Десктоп: 3 слайда
    } else if (window.innerWidth >= 768) {
        return 2; // Планшет: 2 слайда
    } else {
        return 1; // Мобилка: 1 слайд
    }
};
const initializeCarousel = () => {
    visibleSlides = getVisibleSlidesCount();
    scrollCarouselCounter = 0;
    updateCountDisplay();
    startAutoScroll();
};

const updateCountDisplay = () => {
    const lastVisibleSlide = ((scrollCarouselCounter + visibleSlides - 1) % totalSlides) + 1;
    carouselCountCurrent.textContent = `${lastVisibleSlide}`;
};

const swipeContainer = (side, step) => {
    if (side === 'right') {
        scrollCarouselCounter += visibleSlides;

        if (scrollCarouselCounter >= totalSlides) {
            scrollCarouselCounter = 0;
            carouselContainer.scrollLeft = 0;
        } else {
            carouselContainer.scrollLeft += step;
        }
    } else {
        scrollCarouselCounter -= visibleSlides;

        if (scrollCarouselCounter < 0) {
            scrollCarouselCounter = totalSlides - visibleSlides;
            carouselContainer.scrollLeft = carouselContainer.scrollWidth - carouselContainer.offsetWidth;
        } else {
            carouselContainer.scrollLeft -= step;
        }
    }

    updateCountDisplay();
};

const startAutoScroll = () => {
    if (autoScrollTimer) clearInterval(autoScrollTimer);

    autoScrollTimer = setInterval(() => {
        const step = carouselContainer.scrollWidth / totalSlides * visibleSlides;
        swipeContainer('right', step);
    }, 4000);
};

const stopAutoScroll = () => {
    clearInterval(autoScrollTimer);
};

leftCarouselButton.addEventListener('click', () => {
    const step = carouselContainer.scrollWidth / totalSlides * visibleSlides;
    swipeContainer('left', step);
    stopAutoScroll();
    startAutoScroll();
});
rightCarouselButton.addEventListener('click', () => {
    const step = carouselContainer.scrollWidth / totalSlides * visibleSlides;
    swipeContainer('right', step);
    stopAutoScroll();
    startAutoScroll();
});

window.addEventListener('resize', () => {
    initializeCarousel();
});

initializeCarousel();