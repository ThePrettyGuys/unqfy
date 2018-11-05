const UnqfyFileSystem = require('../unqfy/unqfyFileSystem');
const UnqfyRepository = require('../unqfy/repositorys/unqfyRepository');
let fileName = require('../config/config').FILENAME;

class Unqfyer {
    constructor(){
        this.repository = new UnqfyRepository();
        this.unqfyFileSystem = new UnqfyFileSystem(this.repository);
        this.unqfy = this.unqfyFileSystem.getUNQfy(fileName);
    }

    get(){
        this.repository = new UnqfyRepository();
        this.unqfyFileSystem = new UnqfyFileSystem(this.repository);
        this.unqfy = this.unqfyFileSystem.getUNQfy(fileName);
        return this.unqfy
    }


    save() {
        this.unqfyFileSystem.saveUNQfy(this.unqfy, fileName);
    }
}

module.exports = Unqfyer