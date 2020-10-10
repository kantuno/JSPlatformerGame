import Platform from "./platform.js";

const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

/**
 * Main game engine class
 */
class Engine{
    #canvas;
    #ctx;
    #height;
    #objects;
    #width;

    /**
     * Constructor for the Engine class
     * @param {HTML div element} div - The root div where the engine will create a canvas as a child. 
     */
    constructor(div){
        let canvas = document.createElement("CANVAS");
        div.appendChild(canvas);

        this.#canvas = canvas;
        this.#ctx = canvas.getContext("2d");
        this.#height = 100;
        this.#objects = [];
        this.#width = 100;
    }

    /**
     * Initialize the game canvas by setting its height, width, and adding the css gameWindow class to it.
     * @param {number} width - The width in pixels of the game canvas. Defaults to 100.
     * @param {number} height - The height in pixels of the game canvas. Defaults to 100.
     */
    init(width, height){
        if(arguments.length === 2){
            this.#height = height;
            this.#width = width;
        }

        this.#canvas.classList.add("gameWindow");
        this.#canvas.setAttribute('width', this.#width.toString());
        this.#canvas.setAttribute('height', this.#height.toString());
    }

    /**
     * Moves a GameObject to a position.
     * @param {GameObject} obj - An instance of a GameObject or a class that extends it.
     * @param {Object} newpos - The position in format {x, y} where the object will be moved to. 
     */
    #moveToPos(obj, newpos){
        obj.pos = {x: newpos.x, y: newpos.y};
    }

    /**
     * Moves a GameObject relative to where it currently is.
     * @param {GameObject} obj - An instance of a GameObject or a class that extends it. 
     * @param {Object} vect - Values to move the object horizontally and/or vertically in format {x, y}.
     */
    #translate(obj, vect){
        obj.pos = {x: obj.pos.x + vect.x, y: obj.pos.y + vect.y};
    }

    /**
     * Clears the canvas and redraws everything contained within the objects array.
     */
    #render(){
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#objects.forEach(obj => obj.draw(this.#ctx));
    }

    /**
     * Handles keyboard input
     * @param {Event} e - The event triggered by a key press.
     */
    #keyinput(e){
        let platform = this.#getObjectByName("plat");

        if(e.keyCode === UP_KEY){
            this.#translate(platform, {x: 0, y: -1});
        } else if(e.keyCode === DOWN_KEY){
            this.#translate(platform, {x: 0, y: 1});
        } else if(e.keyCode === LEFT_KEY){
            this.#translate(platform, {x: -1, y: 0});
        }
        else if(e.keyCode === RIGHT_KEY){
            this.#translate(platform, {x: 1, y: 0});
        }
    }

    /**
     * Checks whether a point is within a rectangle.
     * @param {DOMRect} rect - A rectange. 
     * @param {Object} pos - The point stored in format {x, y}.
     * @return {Boolean} True if the point is within the rectangle, otherwise false.
     */
    #isInBounds(rect, pos){
        if(pos.x > rect.left && pos.x < rect.left + rect.width && pos.y > rect.top && pos.y < rect.top + rect.height){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Handles mouse click events.
     * @param {Event} e - The event triggered by a mouse click. 
     */
    #mouseinput(e){
        let rect = this.#canvas.getBoundingClientRect();
        if(this.#isInBounds(rect, {x: e.clientX, y: e.clientY})){
            let platform = this.#getObjectByName("plat");
            this.#moveToPos(platform, {x: e.clientX - rect.left, y: e.clientY - rect.top});
        }
    }

    /**
     * Checks to see whether a GameObject with a given name exists within the objects array.
     * @param {String} name
     * @return {GameObject} The object from the objects array with the name given.
     */
    #getObjectByName(name){
        let found = false;
        let returnObj;

        this.#objects.forEach(obj => {
            if(obj.name === name){
                found = true;
                returnObj = obj;
            }
        })

        if(!found){
            console.log("Object " + name + " not found");
        }

        return returnObj;
    }

    /**
     * Detects collision between two given objects, or one object and everything in the objects array.
     * @param {GameObject} objOne - The first object. 
     * @param {GameObject} objTwo - The second object. Optional, if not given objOne is checked against every element of objects.
     * @return {GameObject} The object objOne collided with, or null if there is no collision. 
     */
    #detectCollision(objOne, objTwo){
        if(arguments.length === 1){

        }
        else{

        }
    }

    /**
     * Starts the game engine.
     * @param {number} fps - The frames per second to run the game at. Defaults to 30. 
     */
    start(fps){
        if(typeof(fps) === 'undefined'){
            fps = 30;
        }

        document.addEventListener('keydown', (e) => this.#keyinput(e));
        this.#canvas.addEventListener('mousedown', (e) => this.#mouseinput(e));

        this.#objects.push(new Platform("plat", {x: 100, y: 100}, 200, "blue"));

        setInterval(() => {
            this.#render();
        }, 1000 / fps);
    }
}

export default Engine;