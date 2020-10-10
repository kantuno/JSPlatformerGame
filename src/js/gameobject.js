class GameObject {
    height;
    width;
    pos;
    name;

    constructor(name, pos, width, height){
        this.height = (typeof height === 'undefined') ? 10 : height;
        this.pos = (typeof pos === 'undefined') ? {x: 0, y: 0} : pos;
        this.width = (typeof width === 'undefined') ? 10 : width;
        this.name = (typeof name === 'undefined') ? "" : name;
    }

    draw(ctx){
        console.log("Error, no draw function implemented");
    }
}

export default GameObject;