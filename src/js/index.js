import "../css/styles.css";
import Engine from "./engine.js";

document.addEventListener('DOMContentLoaded', () => {
    let gameEngine = new Engine(document.querySelector("#root"));
    gameEngine.init(500, 500);
    gameEngine.start();
});