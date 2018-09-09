class ShowPartialSearchHandler {

    constructor() {
       this.command = "FindInAll";
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, searchData) {
       let results=unqfy.searchByName(searchData.search);
       //Esto se podria hacer un poquito mas lindo, pero lo veo cuando vea bien como se imprimen las cosas!
       if(results.artists.length === 0 && 
               results.albums.length === 0 &&
               results.tracks.length === 0 &&
               results.playlists.length === 0 ){ console.log ( "No hay resultados para tu busqueda.")}
       else{
           console.log(results);    
       } 
    }

}

module.exports = ShowPartialSearchHandler;