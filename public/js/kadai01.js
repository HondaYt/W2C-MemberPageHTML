const btns = document.querySelectorAll(".btn");
const contents = document.querySelectorAll(".content");
contents[0].classList.add("active");
btns[0].classList.add("active");

btns.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
        btns.forEach((btn, j) => {
            if (i !== j) {
                contents[j].classList.add("hidden");
            }
            btn.classList.remove("active");
            contents[j].classList.remove("active");
        });
        btns[i].classList.remove("hidden");
        contents[i].classList.remove("hidden");
        btns[i].classList.add("active");
        contents[i].classList.add("active");
    });
});
