window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
