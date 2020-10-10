import GameObject from './gameobject.js';

/**
 * Class to create a ball.
 */
class Ball extends GameObject {
    color;
    radius;

    /**
     * Constructor for the ball.
     * @param {string} name - The name of the ball object. 
     * @param {Object} pos - The position of the ball in format {x, y}. 
     * @param {number} radius - The radius of the ball.
     * @param {string} color - The hexadecimal value of the color for the ball. Alternatively a color name. Optional.
     */
    constructor(name, pos, radius, color){
        super(name, pos);
        radius === undefined ? this.radius = 10 : this.radius = radius;
        color === undefined ? this.color = 'black' : this.color = color; 
        this.collisionType = 'circle';
    }

    /**
     * @copydoc GameObject.draw(ctx).
     */
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export default Ball;