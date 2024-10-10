document.addEventListener('DOMContentLoaded', (event) => {
    const title = document.querySelector(".title");
    const subtitleFirstLine = document.querySelector(".subtitle .line1");
    const subtitleSecondLine = document.querySelector(".subtitle .line2");
    const image = document.querySelector(".featured-image");
    const viewportWidth = window.innerWidth;
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    const addAnimation = (el, delay, animationName) => {
        el.style.opacity = 0;

        setTimeout(() => {
            el.style.opacity = '1';
            el.classList.add(animationName);
        }, delay);
    }
    
    //👇 Below code to make the subtitle element responsive, while maintaining the animation.
    if(viewportWidth <= 475) {
        subtitleFirstLine.textContent = `Dive into the intricate world of "Lore Olympus", where `;
        subtitleSecondLine.innerHTML = "ancient myths collide with modern story, exploring power, <br> love, trauma, and identity in captivating ways.";
    }
    else if(viewportWidth > 475 && viewportWidth <= 610) {
        subtitleFirstLine.textContent = `Dive into the intricate world of "Lore Olympus", where ancient myths`;
        subtitleSecondLine.innerHTML = "collide with modern story, exploring power, love, trauma, and identity <br> in captivating ways.";
    }

    //👇 Below code to add animation to the Hero-Section Elements.
    addAnimation(title, 300, "animate-title");
    addAnimation(subtitleFirstLine, 800, "animate-subtitle");
    addAnimation(subtitleSecondLine, 2600, "animate-subtitle");
    addAnimation(image, 3000, "animate-image");

    let slideWidth = slides[0].getBoundingClientRect().width;
    let slideIndex = 0;
    let slidesToShow = 1;

    //👇 Function to Set slide positions
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };

    const updateSlidesToShow = () => {
        if (viewportWidth >= 1024) {
          slidesToShow = 3;
        } else if (viewportWidth >= 768) {
          slidesToShow = 2;
        } else {
          slidesToShow = 1;
        }

        slideWidth = track.getBoundingClientRect().width / slidesToShow;
        slides.forEach(setSlidePosition);
        moveToSlide(slideIndex);
    };
    
    // Arrange slides next to one another
    slides.forEach(setSlidePosition);
    
    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0) {
          targetIndex = slides.length - slidesToShow;
        } else if (targetIndex > slides.length - slidesToShow) {
          targetIndex = 0;
        }
        track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
        slideIndex = targetIndex;
    };
    
    // Next button click
    nextButton.addEventListener('click', () => {
        moveToSlide(slideIndex + slidesToShow);
    });
    
    // Previous button click
    prevButton.addEventListener('click', () => {
        moveToSlide(slideIndex - slidesToShow);
    });
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateSlidesToShow();
    });
    
    // Initial setup
    updateSlidesToShow();
});
