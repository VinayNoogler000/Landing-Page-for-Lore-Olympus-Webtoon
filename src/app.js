document.addEventListener('DOMContentLoaded', (event) => {
    const title = document.querySelector(".title");
    const subtitleFirstLine = document.querySelector(".subtitle .line1");
    const subtitleSecondLine = document.querySelector(".subtitle .line2");
    const image = document.querySelector(".featured-image");
    const viewportWidth = window.innerWidth;

    //👇 Below are the variables for Carousel Component
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    let currentIndex = 0;
    let slidesToShow = getSlidesToShow();

    //👇 Below function to add animation to the Hero-Section Elements.
    const addAnimation = (el, delay, animationName) => {
        el.style.opacity = 0;

        setTimeout(() => {
            el.style.opacity = '1';
            el.classList.add(animationName);
        }, delay);
    }

    //👇 Below functions to add functionality in Carousel Component.
    function getSlidesToShow() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    //👇 Below code to make the subtitle element responsive, while maintaining the animation.
    if (viewportWidth <= 475) {
        subtitleFirstLine.textContent = `Dive into the intricate world of "Lore Olympus", where `;
        subtitleSecondLine.innerHTML = "ancient myths collide with modern story, exploring power, <br> love, trauma, and identity in captivating ways.";
    }
    else if (viewportWidth > 475 && viewportWidth <= 610) {
        subtitleFirstLine.textContent = `Dive into the intricate world of "Lore Olympus", where ancient myths`;
        subtitleSecondLine.innerHTML = "collide with modern story, exploring power, love, trauma, and identity <br> in captivating ways.";
    }

    addAnimation(title, 300, "animate-title");
    addAnimation(subtitleFirstLine, 800, "animate-subtitle");
    addAnimation(subtitleSecondLine, 2600, "animate-subtitle");
    addAnimation(image, 3000, "animate-image");

    //👇 Event listeners for the Buttons of the Carousel Component
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + slidesToShow) % slides.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - slidesToShow + slides.length) % slides.length;
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        slidesToShow = getSlidesToShow();
        updateCarousel();
    });

    //👇 Initialize  Carousel Component
    updateCarousel();
});
