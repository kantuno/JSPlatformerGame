import Platform from "./platform.js";
import Ball from "./ball.js";
import GameObject from "./gameobject.js";
import Sprite from './sprite.js';

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
    #player;
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
        let platform = this.#getObjectByName("player");

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
            this.#moveToPos(this.#getObjectByName("player"), {x: e.clientX - rect.left, y: e.clientY - rect.top});
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
     * Detects collision between two rectangle shaped objects.
     * @param {GameObject} objOne - The first object. 
     * @param {GameObject} objTwo - The second object.
     * @return {boolean} True if the objects are collided, false otherwise
     */
    #detectRectCollision(objOne, objTwo){
        if(objOne.pos.x < objTwo.pos.x + objTwo.width &&
            objOne.pos.x + objOne.width > objTwo.pos.x &&
            objOne.pos.y < objTwo.pos.y + objTwo.height &&
            objOne.pos.y + objOne.height > objTwo.pos.y){
                return true;
        }
        else{
            return false;
        }
    }

    /**
     * Detects collision between two circle shaped objects.
     * @param {GameObject} objOne - The first object. 
     * @param {GameObject} objTwo - The second object.
     * @return {boolean} True if the objects are collided, false otherwise
     */
    #detectCircleCollision(objOne, objTwo){
        let dx = objOne.pos.x - objTwo.pos.x;
        let dy = objOne.pos.y - objTwo.pos.y;

        if(Math.sqrt(dx * dx + dy * dy) < objOne.radius + objTwo.radius){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Detects collision between a rectangle shaped object and a circle shaped object.
     * @param {GameObject} rect - The rectangle object. 
     * @param {GameObject} circle - The circle object.
     * @return {boolean} True if the objects are collided, false otherwise
     */
    #detectRectCircleCollision(rect, circle){
        let xDistance = Math.abs((rect.pos.x + rect.width / 2) - circle.pos.x);
        let yDistance = Math.abs((rect.pos.y + rect.height / 2) - circle.pos.y);

        if(xDistance > (rect.width / 2 + circle.radius)){
            return false;
        }
        else if(yDistance > (rect.height / 2 + circle.radius)){
            return false;
        }
        else if(xDistance <= (rect.width / 2)){
            return true;
        }
        else if(yDistance <= (rect.height / 2)) {
            return true;
        }
        else{
            let dx = xDistance - rect.width / 2;
            let dy = yDistance - rect.height / 2;

            return(dx * dx + dy * dy <= (circle.radius * circle.radius));
        }
    }

    /**
     * Takes two objects and passes them on to the correct collision detection function depending on their collision types.
     * @param {GameObject} objOne 
     * @param {GameObject} objTwo
     * @return {boolean} True if the objects have collided, false otherwise 
     */
    #detectCollision(objOne, objTwo){
        if(objOne.collisionType === 'rect' && objTwo.collisionType === 'rect'){
            return this.#detectRectCollision(objOne, objTwo);
        }
        else if (objOne.collisionType === 'circle' && objTwo.collisionType === 'circle'){
            return this.#detectCircleCollision(objOne, objTwo);
        }
        else if(objOne.collisionType === 'rect' && objTwo.collisionType === 'circle'){
            return this.#detectRectCircleCollision(objOne, objTwo);
        }
        else if(objOne.collisionType === 'circle' && objTwo.collisionType === 'rect'){
            return this.#detectRectCircleCollision(objTwo, objOne);
        }
    }

    /**
     * Checks an object against every element in the #objects array for collision.
     * @param {GameObject} obj - The object to check for collision against every other object.
     * @return {GameObject[]} An array of all objects obj collided with.
     */
    #checkForCollision(obj){
        let returnArray = [];

        this.#objects.forEach(item => {
            if(item != obj){
                if(this.#detectCollision(obj, item)){
                    returnArray.push(item);
                }
            }
        });

        return returnArray;
    }

    /**
     * Adds an object to the #objects array after error checking.
     * @param {GameObject} obj
     * @return {GameObject} The object added to the array.
     */
    #addObject(obj){
        if(arguments.length === 1){
            if(obj instanceof GameObject){
                let isUnique = true;

                this.#objects.forEach(item => {
                    if(obj.name === item.name){
                        isUnique = false;
                    }
                });

                if(isUnique){
                    this.#objects.push(obj);
                    return obj;
                }
                else{
                    console.log("Error: addObject tried to add a gameobject with a non-unique name.");
                }
            }
            else{
                console.log("Error: addObject tried to add a non-gameobject.");
            }
        }
        else{
            console.log("Error: addObject incorrect number of arguments.");
        }
    }

    /**
     * Starts the game engine.
     * @param {number} fps - The frames per second to run the game at. Defaults to 30. 
     */
    start(fps){
        if(fps === undefined){
            fps = 30;
        }

        document.addEventListener('keydown', (e) => this.#keyinput(e));
        this.#canvas.addEventListener('mousedown', (e) => this.#mouseinput(e));

        this.#player = this.#addObject(new Sprite("player", {x: 100, y: 100}, "test"));
        this.#addObject(new Platform("plattwo", {x: 400, y: 410}, 50, "red"));
        this.#addObject(new Ball("balltwo", {x: 400, y: 400}, 30));       

        setInterval(() => {
            this.#checkForCollision(this.#player).forEach(col => {
                console.log(col.name);
            });

            this.#render();
        }, 1000 / fps);
    }
}

export default Engine;