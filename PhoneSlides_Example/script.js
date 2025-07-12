
let currentSlideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let currentTransition = 'slide';
let transitionTypes = ['slide', 'fade', 'flip'];

function initializeSlideshow() {
    createSlides();
    createIndicators();
    showSlide(0);
}

function createSlides() {
    const slideWrapper = document.querySelector('.slide-wrapper');
    slideWrapper.innerHTML = '';
    
    slidesData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        slideElement.id = `slide-${index}`;
        
        slideElement.innerHTML = `
            <div class="slide-content">
                <h1 class="slide-title">${slide.title}</h1>
                <div class="slide-image">
                    <img src="${slide.image}" alt="Slide ${index + 1}" onerror="this.style.display='none'">
                </div>
                <p class="slide-description">${slide.description}</p>
            </div>
        `;
        
        slideWrapper.appendChild(slideElement);
    });
}

function createIndicators() {
    const indicatorContainer = document.querySelector('.slide-indicators');
    indicatorContainer.innerHTML = '';
    
    slidesData.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.onclick = () => currentSlide(index + 1);
        indicatorContainer.appendChild(indicator);
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.classList.remove('slide-transition', 'fade-transition', 'flip-transition');
    });
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
        slides[index].classList.add(`${currentTransition}-transition`);
        indicators[index].classList.add('active');
    }
    
    updateNavigationButtons();
}

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    
    if (newIndex >= 0 && newIndex < slidesData.length) {
        currentSlideIndex = newIndex;
        showSlide(currentSlideIndex);
    }
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === slidesData.length - 1;
}


function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            changeSlide(-1);
        } else {
            changeSlide(1);
        }
    }
}

function handleKeyboard(e) {
    switch(e.key) {
        case 'ArrowLeft':
            changeSlide(-1);
            break;
        case 'ArrowRight':
            changeSlide(1);
            break;
        case 'Home':
            currentSlide(1);
            break;
        case 'End':
            currentSlide(slidesData.length);
            break;
    }
}

document.addEventListener('DOMContentLoaded', initializeSlideshow);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);
document.addEventListener('keydown', handleKeyboard);

window.addEventListener('resize', () => {
    showSlide(currentSlideIndex);
});

function changeTransitionEffect() {
    const select = document.getElementById('transition-effect');
    currentTransition = select.value;
    
    const currentSlide = document.querySelector('.slide.active');
    if (currentSlide) {
        currentSlide.classList.remove('slide-transition', 'fade-transition', 'flip-transition');
        currentSlide.classList.add(`${currentTransition}-transition`);
    }
}