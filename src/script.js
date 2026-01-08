
let currentSlideIndex = 0;
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

        const hasImage = slide.image && slide.image.trim() !== '';
        const hasDescription = slide.description && slide.description.trim() !== '';

        // Add layout class based on content
        if (!hasImage && hasDescription) {
            slideElement.classList.add('description-only');
        } else if (hasImage && !hasDescription) {
            slideElement.classList.add('image-only');
        }

        let imageHTML = '';
        if (hasImage) {
            imageHTML = `
                <div class="slide-image">
                    <img src="${slide.image}" alt="Slide ${index + 1}" onerror="this.style.display='none'">
                </div>
            `;
        }

        let descriptionHTML = '';
        if (hasDescription) {
            descriptionHTML = `<p class="slide-description">${slide.description}</p>`;
        }

        slideElement.innerHTML = `
            <div class="slide-content">
                <h1 class="slide-title">${slide.title || ''}</h1>
                ${imageHTML}
                ${descriptionHTML}
            </div>
        `;

        // Add click/tap navigation
        slideElement.addEventListener('click', handleSlideClick);

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


function handleSlideClick(e) {
    const slide = e.currentTarget;
    const slideRect = slide.getBoundingClientRect();
    const clickX = e.clientX || (e.touches && e.touches[0].clientX);
    const slideMiddle = slideRect.left + slideRect.width / 2;

    if (clickX < slideMiddle) {
        // Clicked left side - go to previous (except on first slide)
        if (currentSlideIndex > 0) {
            changeSlide(-1);
        }
    } else {
        // Clicked right side - go to next (except on last slide)
        if (currentSlideIndex < slidesData.length - 1) {
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