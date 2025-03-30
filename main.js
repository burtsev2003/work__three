let swiper;

function initSwiper() {
    swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.content__pagination',
            clickable: true,
        },
    });
}

function handleResize() {
    if (window.innerWidth < 768) {
        if (!swiper) {
            initSwiper();
        }
    } else {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
    }
}

handleResize();

window.addEventListener('resize', handleResize);

document.addEventListener("DOMContentLoaded", function () {
    const showMoreButton = document.getElementById("next__but");
    const hideItemsButton = document.getElementById("back__but");
    const listItems = document.querySelectorAll(".content__ul_li");

    let hiddenCount = 0;

    function updateVisibility() {
        const width = window.innerWidth;

        listItems.forEach(item => {
            item.style.display = "list-item";
        });

        if (width >= 768 && width < 1120) {
            hiddenCount = 5;
        } else if (width >= 1120) {
            hiddenCount = 3;
        } else {
            hiddenCount = 0;
        }

        for (let i = listItems.length - hiddenCount; i < listItems.length; i++) {
            listItems[i].style.display = "none";
        }
    }

    showMoreButton.addEventListener("click", function (event) {
        event.preventDefault();
        listItems.forEach(item => {
            item.style.display = "list-item";
        });
        showMoreButton.style.display = "none";
        hideItemsButton.style.display = "block";
    });

    hideItemsButton.addEventListener("click", function (event) {
        event.preventDefault();
        updateVisibility();
        hideItemsButton.style.display = "none";
        showMoreButton.style.display = "block";
    });

    window.addEventListener("resize", updateVisibility);
    updateVisibility();
});