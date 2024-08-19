let phrases = ["Fui de paseo", "Visitamos un parque", "Comí helado", "Vimos una película", "Regresamos a casa"];
let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "brown", "black", "white", "gray", "cyan", "magenta", "lime", "maroon", "navy", "olive", "purple", "teal"];
let i = 0;

let button = document.getElementById("myButton");
button.addEventListener("click", function() {
    let buttonWidth = this.offsetWidth;
    let buttonHeight = this.offsetHeight;
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;

    this.style.top = Math.random() * (window.innerHeight - buttonHeight) + "px";
    this.style.left = Math.random() * (window.innerWidth - buttonWidth) + "px";

    this.textContent = phrases[i % phrases.length];

    this.style.borderRadius = (i % 2 === 0) ? "50%" : "20px";

    this.style.transform = (i % 2 === 0) ? "scale(1.5)" : "scale(1)";

    i++;
});