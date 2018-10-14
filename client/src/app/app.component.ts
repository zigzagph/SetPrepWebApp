import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

import { Song } from './song';
//import { concatAll } from 'rxjs/operators';
//import { ThrowStmt } from '@angular/compiler';
//import { SongComponent } from './song/song.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    songArray: Array<Song> = [];
    purgeSongs: Array<string> = ['1/30/97 Jam', '12345 678910 11 12', '[interview]'];

    previousThreeArray: Array<Song> = [];
    previousThreeActive = true;
    previousThreeColor = 'red';

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
                        s.hidden = false;
                        s.id = song.Id;
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

    getPreviousShows(): void {
        this.appService.getPrevious().subscribe(
            showData => {
                // for each show
                showData.forEach(show => {
                    // for each set
                    show.sets.forEach(set => {
                        // for each song
                        set.songs.forEach(song => {
                            let arr = this.songArray.filter(s => s.id === song.id);
                            arr[0].color = this.previousThreeColor;
                            this.previousThreeArray.push(arr[0]);

                            /* console.log(this.previousThreeArray); */
                        });
                    });
                });
            },
            error => { console.log(error); }
        );
    }

    colorEvent(color: any): void {
        this.previousThreeColor = color;

        this.previousThreeArray.forEach(song => {
            song.color = color;
        })
    }

    filterPreviousShows(): void {
        console.log("filtering...");
        //console.log(this.previousThreeArray);

        if( this.previousThreeArray.length === 0 ){
            this.previousThreeActive = !this.previousThreeActive;

            this.previousThreeArray.forEach(song => {
                //song.hidden = true;
                if( song.color === this.previousThreeColor ){
                    song.hidden = true;
                }
            })
        }
    }
}
