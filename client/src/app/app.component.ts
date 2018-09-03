import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

import { Song } from './song';
import { concatAll } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    songArray: Array<Song> = [];
    purgeSongs: Array<string> = ['1/30/97 Jam', '12345 678910 11 12', '[interview]'];

    constructor(private appService: AppService) {}
    
    ngOnInit(): void {

        // get all of the bands songs
        this.appService.getSongs().subscribe(
            showData => { 
                console.log("Count : " + showData.length);
                
                // Alphabetiallby sort the string array
                showData.sort(function(a, b){
                    var x = a.Name.toLowerCase();
                    var y = b.Name.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });

                // Create a song object for each returned song
                showData.forEach(song => {
                    // skip the song and do not push it into the song array
                    // if it is in the purge songs list
                    if( this.purgeSongs.findIndex(function(val) {
                        if (this === val) { return true; }
                        return false;
                    }, song.Name ) === -1 ){
                        let s = new Song();
                        s.name = song.Name;
                        s.cover = song.Cover;
                        this.songArray.push(s);
                    }
                });
            },
            error => { console.log(error); }
        );

        /* this.appService.getVenues().subscribe(
            data => { 
                console.log("GV Return");
                console.log(data);
                //console.log(typeof data) 
            },
            error => { 
                console.log("Error");
                console.log(error); 
            }
        );

        this.appService.getLocales().subscribe(
            data => { 
                console.log("GL Return");
                console.log(data);
                //console.log(typeof data) 
            },
            error => { 
                console.log("Error");
                console.log(error); 
            }
        ); */
    }

    getPrevious(): void {
        this.appService.getPrevious().subscribe(
            showData => {
                // for each show
                showData.forEach(show => {
                    // for each set
                    show.sets.forEach(set => {
                        // for each song
                        set.songs.forEach(song => {
                            // for each song in song array
                            this.songArray.forEach(sng => {
                                // mark the song red in the song array
                                if (sng.name === song.name) {
                                    sng.color = 'red';
                                }
                            })
                        });
                    });
                });
            },
            error => { console.log(error); }
        );
    }
}
