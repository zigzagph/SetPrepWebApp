import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

import { Song } from './song';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    songArray: Array<Song> = [];
    coversArray: Array<Song> = [];
    totalCovers = 0;
    purgeSongs: Array<string> = ['1/30/97 Jam', '12345 678910 11 12', '[interview]', 'Unknown', 'Costume Contest Jam', 'Countdown Medley', 'Disco Bisquick', 'Flip-Flop', 'Fuck That Doll', 'Giveaway', 'Hibbage', 'Ida Fith', 'Jam', 'Jam On The River Song', 'Killing Eleven', 'Koyaanisqatsi Jam', 'Latin Pussy', 'Leora', 'Loch Ness Monster', 'Macina Verde', 'Manic Depression', 'Mariel Bop Bop', 'Marvelous', 'new song', 'Ohayou Gozaimasu', 'Onery Funk', 'Paul Revere', 'Road Song', 'Salute To Sammy', 'Smash', 'Smell The Funk', 'South Of The Border Pussy', 'Sprawl', 'Sugarcane', 'Termites', 'The Great Pumpkin Jam', 'The Truth', 'Tony\'s Birthday Jam', 'Ulua', 'Waltz In Black', 'What A Show', 'Worcester Jam'];

    previousThreeArray: Array<Song> = [];
    previousThreeColor = '#f10f0f';

    checkModel: any = { left: false, middle: true, right: false };

    constructor(private appService: AppService) {}
    
    ngOnInit(): void {


        // get all of the bands songs
        this.appService.getSongs().subscribe(
            showData => { 
                console.log("Count : " + showData.length);
                //console.log(this.color);
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

                // Create the covers array
                this.coversArray = this.songArray.filter(song => song.cover);
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

    test(): void {
        console.log("test");
    }

    getPreviousThreeShows(): void {
        this.appService.getPrevious().subscribe(
            showData => {
                // temp array
                let sArray = [];
                
                // for each show
                showData.forEach(show => {
                    // for each set
                    show.sets.forEach(set => {
                        // for each song
                        set.songs.forEach(song => {
                            let arr = this.songArray.filter(s => s.id === song.id);
                            arr[0].color = this.previousThreeColor;
                            sArray.push(arr[0]);
                        });
                    });
                });

                // filter out the duplicates
                this.previousThreeArray = sArray.filter(function(item, pos) {
                    return sArray.indexOf(item) == pos;
                })

            },
            error => { console.log(error); }
        );
    }

    setPreviousThreeColorEvent(color: any): void {
        this.previousThreeColor = color;

        this.previousThreeArray.forEach(song => {
            song.color = this.previousThreeColor;
        })
    }

    filterPreviousShows(): void {
        //console.log("filtering...");

        if( this.previousThreeArray.length > 0 ){
            this.previousThreeArray.forEach(song => {
                song.hidden = !song.hidden;
            })
        }
    }

    filterCovers(): void {
        //console.log("Filtering Covers...");
        
        if( this.songArray.length > 0 ){
            this.songArray.forEach( song => {
                if( song.cover ) {
                    song.hidden = !song.hidden;
                }
            })
        }
    }
}
