import GameObject from "./gameobject.js";

const PLATFORM_HEIGHT = 10;

/**
 * Class to create a flat platform.
 */
class Platform extends GameObject{
    #color;

    /**
     * Constructor for the Platform.
     * @param {string} name - The name of the platform object. 
     * @param {Object} pos - The position of the platform in format {x, y}. 
     * @param {number} width - The width of the platform.
     * @param {string} color - The hexadecimal value of the color for the platform. Alternatively a color name. Optional.
     */
    constructor(name, pos, width, color){
        super(name, pos, width, PLATFORM_HEIGHT);

        if(!(color === 'undefined')){
            this.#color = color;
        }
    }

    /**
     * @copydoc GameObject.draw(ctx).
     */
    draw(ctx){
        if(!(this.#color === 'undefined')){
            ctx.fillStyle = this.#color;
        }
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

export default Platform;