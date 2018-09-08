# unqfy
El spotify de la UNQ fiera. Para el seminario de servicios web cloud 2018.

Para ejecutar desde la consola el script con datos precargados: 
   > cd scripts/
   
   > ./initialize-db.sh

Ejemplos de comandos de consola para prueba: 

 >tener en cuenta que si se desea pasar una lista, sólo se puede hacer 
mediante el parámetro *genres* seguido de espacio, y los componentes de dicha 
lista, separados por espacio de la  
forma `--genres pop rock`

>Otra aclaración es que, los otros parámetros como nombre, se deben pasar seguido del =, y de un número o 
string entre comillas, de la forma: `--name="Ana"`. No permitiendose espacios entre parámetro,
símbolo y valor.

* **Agregar Artista**: 
```
node main.js AddArtist --name="Ana" --country="Italia"
```
* **Agregar Album**: 
```
node main.js AddAlbum --name="Greatest Hits" --artistName="Ana" --year=1900
```
* **Agregar Track**: 
```
node main.js AddTrack --name="Sol de mediodia" --album="Greatest Hits" --duration=500 --genres rock pop
```
* **Buscar tracks por artista**: 
```
node main.js SearchSongsFrom --artistName="Analia"
```
* **Buscar albums por artista**:
```
node main.js ShowAllArtistAlbum --artistName="Ana"
```
* **Buscar tracks por album**:
```
node main.js ShowAlbumTracks --albumName="Greatest Hits"
```
* **Mostrar todos los artistas**: 
```
node main.js ShowAllArtists
```
* **Buscar por matching parcial en todas las entidades**
```
node main.js FindInAll --search="Hit"
```
* **Crear una playlist**
```
node main.js CreatePlaylist --name="PlayL de Analia" --genres pop --maxDuration=1000
```

