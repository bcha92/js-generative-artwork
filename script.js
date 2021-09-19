// Generative Art "index.html" //
const canvas = document.querySelector(".canvas");
const body = document.querySelector("body");

// Get Values of Control Buttons
const wit = document.querySelector(".width");
const hgt = document.querySelector(".height");
const opy = document.querySelector(".opacity");
const rad = document.querySelector(".radius");

// Generate and Reset Button Actions
const button = document.querySelector(".button");
const cleanUp = () => {
    let shapes = document.querySelectorAll(".shape");
    button.removeEventListener("click", cleanUp);
    canvas.innerHTML = "";
    console.log("blank canvas");
    button.innerText = "GENERATE";
    button.addEventListener("click", generateArt);
}

const generateArt = () => {
    button.removeEventListener("click", generateArt)
    let c = () => {return Math.ceil(Math.random() * 255) - 1}; // Color
    let o = () => opy.value; // Opacity
    let p = (t = 100) => {return Math.ceil(Math.random() * t) - 1} // Percentage
    let r = (max, min = -1) => {
        return Math.ceil(Math.random() * (max)) + min;
    }; // For all other Custom Randomization

    const gradDir = [ // Gradiation Direction
        "top", "top right", "right", "bottom right", "bottom", "bottom left", "left", "top left"
    ];
    const mix = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
    let w = () => {
        const alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 'o', "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        const vowel = ["a", "e", "i", "o", "u"];
        let words = [alpha[r(alpha.length)] + vowel[r(vowel.length)], alpha[r(alpha.length)] + vowel[r(vowel.length)] + alpha[r(alpha.length)], alpha[r(alpha.length)] + vowel[r(vowel.length)] + alpha[r(alpha.length)] + alpha[r(alpha.length)], alpha[r(alpha.length)] + vowel[r(vowel.length)] + alpha[r(alpha.length)] + vowel[r(vowel.length)] + alpha[r(alpha.length)]];
        return words[r(words.length)];
    };
    
    body.style.backgroundColor = `rgba(${c()}, ${c()}, ${c()}, ${o()})`
    console.log("added canvas");
    
    let count = 1;
    let slow = setInterval(() => {
        let shape = document.createElement("div");
        shape.classList.add("shape")
        shape.style.width = `${r(wit.value, wit.value / 10)}px`;
        shape.style.height = `${r(hgt.value, hgt.value / 10)}px`;
        shape.style.transform = `rotate(${p(360)}deg)`;
        shape.style.top = `${p()}%`;
        shape.style.left = `${p()}%`;
        shape.style.background = `linear-gradient(to ${gradDir[r(gradDir.length)]}, rgba(${c()}, ${c()}, ${c()}, ${o()}), rgba(${c()}, ${c()}, ${c()}, ${o()}))`;
        shape.style.borderRadius = `${p(rad.value)}% ${p(rad.value)}% ${p(rad.value)}% ${p(rad.value)}%`;
        shape.style.color = `rgba(${c()}, ${c()}, ${c()}, ${o() + 0.2})`;
        shape.style.boxShadow = `${r(10, -10)}px ${r(10, -10)}px ${r(50)}px ${r(5, -5)}px rgba(${c()}, ${c()}, ${c()}, ${o()})`;
        shape.style.mixBlendMode = `${mix[r(mix.length)]}`;
        shape.innerText = `${w()}`;
        canvas.appendChild(shape);
        count++;
        console.log(count);
        if (count >= 500) {
            clearInterval(slow);
        }
    }, 17)
    button.innerText = "RESET";
    button.addEventListener("click", cleanUp);
}
button.addEventListener("click", generateArt);
