class Slider {
    constructor(selector, config = {}) {
        // Select the slider element based on the selector provided
        this.slider = document.querySelector(selector);

        // Select the slides container within the slider
        this.slides = this.slider.querySelector('.slides');

        // Select all individual slides within the slides container
        this.slide = this.slider.querySelectorAll('.slide');

        // Select the previous and next navigation buttons
        this.prevButton = this.slider.querySelector('.prev');
        this.nextButton = this.slider.querySelector('.next');

        // Select the dots container for navigation dots
        this.dotsContainer = this.slider.querySelector('.nav-dots');

        // Initialize the current slide index
        this.index = 0;

        // Get autoplay settings from the config object or set default values
        this.autoPlay = config.autoPlay || false;
        this.autoPlayDuration = config.autoPlayDuration || 3000;

        // Initialize the interval for autoplay
        this.interval = null;

        // Initialize the slider
        this.init();
    }

    init() {
        // Create navigation dots based on the number of slides
        this.createDots();

        // Update the navigation dots to reflect the current slide
        this.updateDots();

        // Bind event listeners for navigation buttons and dots
        this.bindEvents();

        // Start autoplay if enabled
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }

    createDots() {
        // Create a dot for each slide and append to the dots container
        this.dots = Array.from({ length: this.slide.length }, (_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('nav-dot');
            dot.dataset.slide = i;
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
            return dot;
        });
    }

    updateDots() {
        // Remove the active class from all dots and add it to the current dot
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[this.index].classList.add('active');
    }

    bindEvents() {
        // Bind click events for previous and next buttons if they exist
        if (this.prevButton && this.nextButton) {
            this.prevButton.addEventListener('click', () => this.prevSlide());
            this.nextButton.addEventListener('click', () => this.nextSlide());
        }
    }

    prevSlide() {
        // Move to the previous slide, looping back to the last slide if at the beginning
        this.index = (this.index - 1 + this.slide.length) % this.slide.length;
        this.updateSlider();
    }

    nextSlide() {
        // Move to the next slide, looping back to the first slide if at the end
        this.index = (this.index + 1) % this.slide.length;
        this.updateSlider();
    }

    goToSlide(index) {
        // Move to a specific slide based on the index
        this.index = index;
        this.updateSlider();
    }

    updateSlider() {
        // Update the position of the slides container to show the current slide
        this.slides.style.transform = `translateX(-${this.index * 100}%)`;
        // Update the navigation dots to reflect the current slide
        this.updateDots();
    }

    startAutoPlay() {
        // Start the autoplay function to automatically move to the next slide at intervals
        this.interval = setInterval(() => this.nextSlide(), this.autoPlayDuration);
    }

    stopAutoPlay() {
        // Stop the autoplay function
        clearInterval(this.interval);
    }
}

// Wait for the DOM to load before initializing the sliders
document.addEventListener('DOMContentLoaded', () => {
    // Initialize two sliders with autoplay enabled
    new Slider('#slider1', { autoPlay: true, autoPlayDuration: 5000 });
    new Slider('#slider2', { autoPlay: true, autoPlayDuration: 5000 });
});
