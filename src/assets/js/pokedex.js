document.addEventListener("DOMContentLoaded", function () {

    console.log("DOMContentLoaded ha ocurrido .....");

    const header = document.querySelector(".header-top");
    const bannerContainer = document.querySelector(".header-container");
    let headerHeight = header.offsetHeight;
    let isScroll = false;


    window.onload = function () {
        // filter-container
        const filterContainer = document.getElementById("filter-container");
        const filterBtn = document.getElementById("btn-filter");
        const closeFilter = document.getElementById("btn-close");

        console.log("DOMContentLoaded ha ocurrido .....");

        if (filterBtn) {
            console.log('Elemento encontrado, agregando event listener');
            filterBtn.addEventListener("click", function () {
                console.log('Se hizo clic en el elemento');
                filterContainer.classList.add("active");
            })
            closeFilter.addEventListener("click", function () {
                console.log('Se hizo clic en el elemento');
                filterContainer.classList.remove("active");
            })
        } else {
            console.log('No se encuentra el elemento en el DOM')
        }
    }

    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY >= headerHeight && !isScroll) {
            header.classList.add('dsjfhsdj');
            if (bannerContainer) {
                bannerContainer.classList.add("active");
            }
            isScroll = true;
        } else if (scrollY < headerHeight && isScroll) {
            header.classList.remove('dsjfhsdj');
            if (bannerContainer) {
                bannerContainer.classList.remove("active");
            }
            isScroll = false;
        }
    }

    window.addEventListener('scroll', handleScroll);


    const dropbtn = document.querySelector('.dropbtn');
    const dropdowns = document.querySelector('.dropdown-content');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');

    dropbtn.addEventListener("click", function () {
        dropdowns.classList.toggle("active");
    });
    document.addEventListener("click", function (event) {
        if (!dropdowns.contains(event.target) && event.target !== dropbtn) {
            dropdowns.classList.remove("active");
        }
    });

    dropdownLinks.forEach(function (dropdownContent) {
        dropdownContent.addEventListener("click", () => {
            dropdowns.classList.remove('active');
        });
        dropdowns.classList.remove('active');
    });

    const generationMenu = document.querySelectorAll("#generation li a");

    generationMenu.forEach((element) => {
        element.addEventListener("click", () => {
            generationMenu.forEach((li) => {
                li.classList.remove("active");
            });
            element.classList.add("active");
        });
    });

})