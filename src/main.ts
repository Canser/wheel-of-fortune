import "./style.css";
import Arrow from "./arrow";
import Wheel from "./wheel";

const parts = [
    "Love",
    "Sex",
    "Money",
    "Fame",
    "Business",
    "Luck",
    "Family",
    "Faith",
    "Health",
    "Sadness",
];

const canvas: HTMLCanvasElement = document.querySelector("#arrow")!;
const ctx = canvas.getContext("2d")!;

const wheelCanvas: HTMLCanvasElement = document.querySelector("#wheel")!;
const wheelCtx = wheelCanvas.getContext("2d")!;

const wheel = new Wheel(wheelCtx, parts);
const arrow = new Arrow(ctx, wheel);
wheel.draw();
arrow.animate();

const toggleButton: HTMLButtonElement = document.querySelector("#toggle")!;
toggleButton.addEventListener("click", () => {
    if (toggleButton.innerText.toUpperCase() === "RESET") {
        arrow.reset();
        toggleButton.innerText = "ROTATE";
        return;
    }

    arrow.setRotation(!arrow.isRotating);
    toggleButton.innerText = arrow.isRotating ? "PAUSE" : "ROTATE";
});
const stopButton: HTMLButtonElement = document.querySelector("#stop")!;
stopButton.addEventListener("click", () => {
    toggleButton.innerText = "RESET";
    arrow.stopRotation();
});
