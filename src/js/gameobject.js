/**
 * Class to store an object in the game. Should never be directly created as an object, only extended.
 */
class GameObject {
    pos;
    name;
    collisionType;

    /**
     * Constructor for a GameObject
     * @param {string} name - The name of the GameObject. Defaults to "".
     * @param {Object} pos - The position of the object in format {x, y}. Defaults to {0, 0}
     */
    constructor(name, pos){
        this.pos = (pos === undefined) ? {x: 0, y: 0} : pos;
        this.name = (name === undefined) ? "" : name;
        this.collisionType = null;
    }

    /**
     * Draws the GameObject onto a canvas rendering context.
     * @param {RenderingContext} ctx - The rendering context of the canvas to draw on.
     */
    draw(ctx){
        console.log("Error, no draw function implemented");
    }
}

export default GameObject;