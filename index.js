document.addEventListener("DOMContentLoaded", (event) => {
    const goToNotesBtn = document.getElementById("goToNotesBtn");
    const figuresContainer = document.getElementById("animation-container");
    const shapeType = ["square", "circle", "triangle"];

    function createFigures() {
        for (let i = 0; i < 80; i++) {
            const shapeDiv = document.createElement("div");
            shapeDiv.className = shapeType[i % shapeType.length];
            // Para asegurar una distribución aleatoria inicial si la animación no cubre todo
            shapeDiv.style.left = `${Math.random() * 100}vw`;
            shapeDiv.style.top = `${Math.random() * 100}vh`;
            figuresContainer.appendChild(shapeDiv);
        }
    }

    goToNotesBtn.addEventListener("click", () => {
        window.location.href = "notas.html";
    });

    createFigures();
});