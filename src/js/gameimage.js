import JpgImages from '../img/*.jpg';
import PngImages from '../img/*.png';

/**
 * Class to house the static function LoadImage which loads an image from the filesystem and puts it into html.
 */
class GameImage{
    /**
     * Loads an image from a file and makes it an html img.
     * @param {string} name - The name of the image file to be loaded, without file extension. 
     * @return {boolean} True if the image file was found, otherwise false.
     */
    static LoadImage(name){
        let returnValue = false;
        
        if(name in JpgImages){
            let img = document.createElement("img");
            img.classList.add(name);
            img.src = JpgImages[name];
            document.querySelector("canvas").appendChild(img);
            returnValue = true;
        }
        else if (name in PngImages){
            let img = document.createElement("img");
            img.classList.add(name);
            img.src = PngImages[name];
            document.querySelector("canvas").appendChild(img);
            returnValue = true;
        }   

        return returnValue;
    }
}

export default GameImage;