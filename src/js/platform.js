import GameObject from "./gameobject.js";

const PLATFORM_HEIGHT = 10;

/**
 * Class to create a flat platform.
 */
class Platform extends GameObject{
    color;
    height;
    width;

    /**
     * Constructor for the Platform.
     * @param {string} name - The name of the platform object. Optional.
     * @param {Object} pos - The position of the platform in format {x, y}. Optional. 
     * @param {number} width - The width of the platform.
     * @param {string} color - The hexadecimal value of the color for the platform. Alternatively a color name. Optional.
     */
    constructor(name, pos, width, color){
        super(name, pos);
        this.collisionType = 'rect';
        this.width = (typeof width === 'undefined') ? 10 : width;
        this.height = PLATFORM_HEIGHT;
        color === undefined ? this.color = 'black' : this.color = color;
    }

    /**
     * @copydoc GameObject.draw(ctx).
     */
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

export default Platform;