import Platform from "./platform.js";

const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

class Engine{
    #canvas;
    #ctx;
    #height;
    #objects;
    #width;

    constructor(div){
        let canvas = document.createElement("CANVAS");
        div.appendChild(canvas);

        this.#canvas = canvas;
        this.#ctx = canvas.getContext("2d");
        this.#height = 100;
        this.#objects = [];
        this.#width = 100;
    }

    init(width, height){
        if(arguments.length === 2){
            this.#height = height;
            this.#width = width;
        }

        this.#canvas.classList.add("gameWindow");
        this.#canvas.style.width = this.#width.toString() + "px";
        this.#canvas.style.height = this.#height.toString() + "px";
    }

    #moveToPos(obj, newpos){
        obj.pos = {x: newpos.x, y: newpos.y};
    }

    #translate(obj, vect){
        obj.pos = {x: obj.pos.x + vect.x, y: obj.pos.y + vect.y};
    }

    #render(){
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#objects.forEach(obj => obj.draw(this.#ctx));
    }

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

    #isInBounds(rect, pos){
        if(pos.x > rect.left && pos.x < rect.left + rect.width && pos.y > rect.top && pos.y < rect.top + rect.height){
            return true;
        }
        else{
            return false;
        }
    }

    #mouseinput(e){
        let platform = this.#getObjectByName("plat");
        this.#moveToPos(platform, {x: e.clientX, y: e.clientY});
    }

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

    start(fps){
        if(typeof(fps) === 'undefined'){
            fps = 30;
        }

        document.addEventListener('keydown', (e) => this.#keyinput(e));
        this.#canvas.addEventListener('mousedown', (e) => this.#mouseinput(e));

        this.#objects.push(new Platform("plat", {x: 100, y: 100}, 50, "blue"));

        setInterval(() => {
            this.#render();
        }, 1000 / fps);
    }
}

export default Engine;