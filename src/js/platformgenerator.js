import Platform from "./platform.js";

/**
 * Class to create a platform generator
 */
class PlatformGenerator{
    #interval;
    #count;
    #id;
    #height;
    #width;

    /**
     * Constructor for the PlatformGenerator.
     * @param {number} interval - Time in seconds between each generated platform
     * @param {number} height - Height of the game canvas
     * @param {number} width - Width of the game canvas
     */
    constructor(interval, width, height){
       this.#interval = interval;
       this.#height = height;
       this.#width = width;
       this.#count = 0;
       this.#id = 0;
    }

    /**
     * Creates a new platform if the time interval has been reached.
     * @return {platform} Returns a new platform if one has been created.
     */
    tick(){
        this.#count += 1;

        if(this.#count >= this.#interval) {
            this.#count = 0;
            this.#id += 1;

            return new Platform('platform' + this.#id, {x: this.#width, y: Math.floor(Math.random() * this.#height)}, 200);
        }
        else{
            return null;
        }
    }
}

export default PlatformGenerator;