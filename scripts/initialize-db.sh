#!/usr/bin/env bash

cd ..
echo "Se limpia la DB."
rm data.json
echo "**********************************************************************************"

echo "Se van a agregar 4 artistas."
node main.js AddArtist --name="Jose Madero" --country="Mexico"
node main.js AddArtist --name="Nach" --country="España"
node main.js AddArtist --name="Residente" --country="Puerto Rico"
node main.js AddArtist --name="Los piojos" --country="Argentina"
echo "**********************************************************************************"

echo "Se agregan albunes, para los artistas."
node main.js AddAlbum --name="Carmesi" --artistName="Jose Madero"

node main.js AddAlbum --name="Mejor que el silencio" --artistName="Nach"

node main.js AddAlbum --name="Resident3" --artistName="Residente"
node main.js AddAlbum --name="Los de atras vienen conmigo" --artistName="Residente"

node main.js AddAlbum --name="Civilizacion" --artistName="Los piojos"
node main.js AddAlbum --name="Maquina de sangre" --artistName="Los piojos"

echo "**********************************************************************************"


echo "Se agregan 2 tracks para cada album, de cada artista."
node main.js AddTrack --name="Sinmigo" --album="Carmesi" --duration=300 --genres pop rock
node main.js AddTrack --name="Abril" --album="Carmesi" --duration=355 --genres pop rock

node main.js AddTrack --name="El idioma de los dioses" --album="Mejor que el silencio" --duration=800 --genres rap
node main.js AddTrack --name="Tu" --album="Mejor que el silencio" --duration=650 --genres rap

node main.js AddTrack --name="Anormales" --album="Resident3" --duration=570 --genres rap rock
node main.js AddTrack --name="Milo" --album="Resident3" --duration=450 --genres rap
node main.js AddTrack --name="La perla" --album="Los de atras vienen conmigo" --duration=500 --genres rap rock
node main.js AddTrack --name="No hay nadie como tu" --album="Los de atras vienen conmigo" --duration=325 --genres rap pop

node main.js AddTrack --name="Manjar" --album="Civilizacion" --duration=400 --genres rock
node main.js AddTrack --name="Bicho de ciudad" --album="Civilizacion" --duration=380 --genres rock
node main.js AddTrack --name="Como ali" --album="Maquina de sangre" --duration=468 --genres rock
node main.js AddTrack --name="No pares" --album="Maquina de sangre" --duration=250 --genres rock
echo "**********************************************************************************"


echo "Se crean 2 playlists"
node main.js CreatePlaylist --name="Playlist de Milo" --genres rock pop --maxduration=950
node main.js CreatePlaylist --name="Playlist de Marcos" --genres rap rock --maxduration=1500