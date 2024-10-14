document.addEventListener('DOMContentLoaded', (event) => {
    const title = document.querySelector(".title");
    const subtitleFirstLine = document.querySelector(".subtitle .line1");
    const subtitleSecondLine = document.querySelector(".subtitle .line2");
    const image = document.querySelector(".featured-image");
    
    const addAnimation = (el, delay, animationName) => { // function to add animation to the Hero-Section Elements.
        el.style.opacity = 0;

        setTimeout(() => {
            el.style.opacity = '1';
            el.classList.add(animationName);
        }, delay);
    }

    //👇 Below are the variables & functions for Carousel Component
    const carousel = {
        track: document.querySelector('.carousel-track'),
        slides: Array.from(document.querySelector('.carousel-track').children),
        nextButton: document.querySelector('.carousel-button.next'),
        prevButton: document.querySelector('.carousel-button.prev'),
        currentSlide: 0,
        visibleSlides: 1
    }; 

    function updateVisibleSlides() { // Update the number of visible slides based on screen width
        const viewportWidth = window.innerWidth;
        if (viewportWidth >= 1024) {
            carousel.visibleSlides = 3;
        } else if (viewportWidth >= 768) {
            carousel.visibleSlides = 2;
        } else {
            carousel.visibleSlides = 1;
        }
    }

    function handleResize() { // Handle window resize
        updateVisibleSlides();
        setSlideWidth();
        updateCarouselView();
    }

    function moveToPrevSlide() { // Move to the previous slide
        if (carousel.currentSlide > 0) {
            carousel.currentSlide -= carousel.visibleSlides;
            updateCarouselView();
        }
    }

    function moveToNextSlide() { // Move to the next slide
        if (carousel.currentSlide < carousel.slides.length - carousel.visibleSlides) {
            carousel.currentSlide += carousel.visibleSlides;
            updateCarouselView();
        }
    }

    function addEventListeners() { // Add event listeners
        carousel.nextButton.addEventListener('click', moveToNextSlide);
        carousel.prevButton.addEventListener('click', moveToPrevSlide);
        window.addEventListener('resize', handleResize);
    }

    function updateButtonStates() { // Update button states
        carousel.prevButton.disabled = carousel.currentSlide === 0;
        carousel.nextButton.disabled = carousel.currentSlide >= carousel.slides.length - carousel.visibleSlides;
    }

    function updateCarouselView() { // Update the carousel view
        const slideWidth = carousel.track.offsetWidth / carousel.visibleSlides;
        carousel.track.style.transform = `translateX(-${carousel.currentSlide * slideWidth}px)`;
        updateButtonStates();
    }
    
    function setSlideWidth() { // Set the width of each slide
        const slideWidth = carousel.track.offsetWidth / carousel.visibleSlides;
        carousel.slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
    }
    
    function initializeCarousel() { // Initialize the carousel
        setSlideWidth();
        updateCarouselView();
        addEventListeners();
    }

    //👇 Below code to make the subtitle element responsive, while maintaining the animation.
    if (window.innerWidth <= 475) {
        subtitleFirstLine.textContent = `Dive into the intricate world of "Lore Olympus", where `;
        subtitleSecondLine.innerHTML = "ancient myths collide with modern story, exploring power, <br> love, trauma, and identity in captivating ways.";
    }
    else if (window.innerWidth > 475 && window.innerWidth <= 610) {
        subtitleFirstLine.textContent = `Dive into the intricate world of "Lore Olympus", where ancient myths`;
        subtitleSecondLine.innerHTML = "collide with modern story, exploring power, love, trauma, and identity <br> in captivating ways.";
    }

    addAnimation(title, 300, "animate-title");
    addAnimation(subtitleFirstLine, 800, "animate-subtitle");
    addAnimation(subtitleSecondLine, 2600, "animate-subtitle");
    addAnimation(image, 3000, "animate-image");


    // Initialize the carousel
    updateVisibleSlides();
    initializeCarousel();
});
