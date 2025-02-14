document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category-description");
    console.log(categories.length);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting ) {
                    entry.target.style.opacity = "1";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3}
    );

    categories.forEach(category => observer.observe(category));
});
