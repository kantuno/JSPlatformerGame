import GameObject from './gameobject.js';
import GameImage from './gameimage.js';

/**
 * A class for sprites
 */
class Sprite extends GameObject{
    #image;
    height;
    width;

    /**
     * Constructor for the sprite class.
     * @param {string} name - The unique name of the sprite. 
     * @param {Object} pos - The position of the sprite in format {x, y}. 
     * @param {string} src - The name of the image to load for the sprite, without file extension.
     */
    constructor(name, pos, src){
        super(name, pos);

        if(GameImage.LoadImage(src)){
            this.#image = document.querySelector("." + src);
            this.width = this.#image.width;
            this.height = this.#image.height;
        }
        else{
            console.log("Failed to load sprite with src " + src);
        }

        this.collisionType = 'rect';
    }

    /**
     * @copydoc GameObject.draw(ctx).
     */
    draw(ctx){
        if(this.#image){
            ctx.drawImage(this.#image, this.pos.x, this.pos.y);
        }
    }
}

export default Sprite;