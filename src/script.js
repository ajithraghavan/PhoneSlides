
let currentSlideIndex = 0;
let currentTransition = 'slide';
let transitionTypes = ['slide', 'fade', 'flip'];

// New state variables for configuration feature
let presentationStarted = false;
let navigationDirection = 'next'; // 'next' or 'prev'
let selectedTransitionType = 'default'; // 'default', 'push', 'morph', 'crossfade'
let previousSlideIndex = -1; // Track previous slide for crossfade

function initializeSlideshow() {
    createSlides();
    createIndicators();
    showSlide(0);
}

// Start presentation from config page
function startPresentation() {
    const transitionSelect = document.getElementById('transition-select');
    selectedTransitionType = transitionSelect.value;

    // Hide config page
    const configPage = document.getElementById('config-page');
    configPage.classList.add('hidden');

    // Show slideshow container
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.style.display = 'flex';

    // Enable crossfade mode if selected (for absolute positioning)
    if (selectedTransitionType === 'crossfade') {
        const slideWrapper = document.querySelector('.slide-wrapper');
        slideWrapper.classList.add('crossfade-mode');
    }

    // Initialize slideshow
    presentationStarted = true;
    initializeSlideshow();
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

    // Handle crossfade transition specially (both slides visible during transition)
    if (selectedTransitionType === 'crossfade' && previousSlideIndex >= 0 && previousSlideIndex !== index) {
        // Add exit animation to previous slide
        const prevSlide = slides[previousSlideIndex];
        if (prevSlide) {
            prevSlide.classList.remove('active');
            prevSlide.classList.add('exiting', 'crossfade-out-transition');

            // Remove exiting slide after animation completes
            setTimeout(() => {
                prevSlide.classList.remove('exiting', 'crossfade-out-transition');
            }, 600); // Match animation duration
        }

        // Show new slide with entrance animation
        if (slides[index]) {
            slides[index].classList.add('active', 'crossfade-in-transition');

            // Clean up animation class after it completes
            setTimeout(() => {
                slides[index].classList.remove('crossfade-in-transition');
            }, 600);
        }

        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[index].classList.add('active');

        previousSlideIndex = index;
        updateNavigationButtons();
        return;
    }

    // Standard transitions (non-crossfade)
    slides.forEach(slide => {
        slide.classList.remove('active', 'exiting');
        slide.classList.remove(
            'slide-transition', 'fade-transition', 'flip-transition',
            'default-transition', 'push-next-transition', 'push-prev-transition', 'morph-transition',
            'crossfade-in-transition', 'crossfade-out-transition'
        );
    });
    indicators.forEach(indicator => indicator.classList.remove('active'));

    if (slides[index]) {
        slides[index].classList.add('active');

        // Apply transition based on selected type
        let transitionClass = '';
        switch (selectedTransitionType) {
            case 'push':
                transitionClass = navigationDirection === 'next' ? 'push-next-transition' : 'push-prev-transition';
                break;
            case 'morph':
                transitionClass = 'morph-transition';
                break;
            case 'crossfade':
                transitionClass = 'crossfade-in-transition';
                break;
            case 'default':
            default:
                transitionClass = 'default-transition';
                break;
        }

        slides[index].classList.add(transitionClass);
        indicators[index].classList.add('active');
    }

    previousSlideIndex = index;
    updateNavigationButtons();
}

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;

    if (newIndex >= 0 && newIndex < slidesData.length) {
        // Track navigation direction for push transition
        navigationDirection = direction > 0 ? 'next' : 'prev';
        currentSlideIndex = newIndex;
        showSlide(currentSlideIndex);
    }
}

function currentSlide(index) {
    const targetIndex = index - 1;
    // Track direction for push transition
    navigationDirection = targetIndex > currentSlideIndex ? 'next' : 'prev';
    currentSlideIndex = targetIndex;
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
    // Only handle keyboard navigation after presentation has started
    if (!presentationStarted) return;

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

document.addEventListener('DOMContentLoaded', function() {
    // Set up start button click handler
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startPresentation);
    }
});
document.addEventListener('keydown', handleKeyboard);

window.addEventListener('resize', () => {
    if (presentationStarted) {
        showSlide(currentSlideIndex);
    }
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