const HandlerWithValidator = require('./handlerWithValidator');

class ShowPartialSearchHandler extends HandlerWithValidator {

    constructor() {
        super('FindInAll', ['search']);
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, searchData) {
        this.validate(searchData);
        let {search} = searchData;

        let results = unqfy.searchByName(searchData.search);
        //Esto se podria hacer un poquito mas lindo, pero lo veo cuando vea bien como se imprimen las cosas!

        if (results.isEmpty()) {
            console.log('No hay resultados para tu busqueda.');
        }
        console.log(`Los items que contienen parcialmente: ${search}, son: `);
        console.log(results);
    }
}

module.exports = ShowPartialSearchHandler;