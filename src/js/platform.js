import GameObject from "./gameobject.js";

const PLATFORM_HEIGHT = 5;

class Platform extends GameObject{
    #color;

    constructor(name, pos, width, color){
        super(name, pos, width, PLATFORM_HEIGHT);

        if(!(color === 'undefined')){
            this.#color = color;
        }
    }

    draw(ctx){
        if(!(this.#color === 'undefined')){
            ctx.fillStyle = this.#color;
        }
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

export default Platform;