const ToTop = document.querySelector("#tothetop");
ToTop &&
    document.addEventListener("scroll", () => {
        console.log(window.scrollY);
        if (window.scrollY > 200) {
            ToTop.style.display = "flex";
        } else {
            ToTop.style.display = "none";
        }
    });

ToTop &&
    ToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });