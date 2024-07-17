document.addEventListener('DOMContentLoaded', () => {
    class Slider {
        constructor(element, { autoPlay = false, autoPlayDuration = 3000 } = {}) {
            this.slider = document.querySelector(element);
            this.slides = this.slider.querySelector('.slides');
            this.slidesCount = this.slides.children.length;
            this.currentSlide = 0;
            this.navArrows = this.slider.querySelectorAll('.nav-arrow');
            this.navDots = this.slider.querySelectorAll('.nav-dot');
            this.autoPlay = autoPlay;
            this.autoPlayDuration = autoPlayDuration;
            this.autoPlayInterval = null;
            this.init();
        }

        init() {
            this.updateDots();
            this.addEventListeners();
            if (this.autoPlay) {
                this.startAutoPlay();
            }
        }

        addEventListeners() {
            this.navArrows.forEach(arrow => {
                arrow.addEventListener('click', (e) => {
                    if (e.target.classList.contains('prev')) {
                        this.prevSlide();
                    } else {
                        this.nextSlide();
                    }
                });
            });

            this.navDots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    this.currentSlide = parseInt(e.target.dataset.slide);
                    this.updateSlider();
                });
            });

            this.slider.addEventListener('mouseover', () => {
                if (this.autoPlay) {
                    this.stopAutoPlay();
                }
            });

            this.slider.addEventListener('mouseout', () => {
                if (this.autoPlay) {
                    this.startAutoPlay();
                }
            });
        }

        prevSlide() {
            this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slidesCount - 1;
            this.updateSlider();
        }

        nextSlide() {
            this.currentSlide = (this.currentSlide < this.slidesCount - 1) ? this.currentSlide + 1 : 0;
            this.updateSlider();
        }

        updateSlider() {
            this.slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
            this.updateDots();
        }

        updateDots() {
            this.navDots.forEach(dot => dot.classList.remove('active'));
            this.navDots[this.currentSlide].classList.add('active');
        }

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDuration);
        }

        stopAutoPlay() {
            clearInterval(this.autoPlayInterval);
        }
    }

    new Slider('#slider1', { autoPlay: true, autoPlayDuration: 5000 });
    new Slider('#slider2', { autoPlay: true, autoPlayDuration: 3000 });
});
