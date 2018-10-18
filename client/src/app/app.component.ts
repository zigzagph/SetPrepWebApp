import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

import { Song } from './song';

class ShowValue {
    constructor(public Text: string, public Value: string) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    showValues: ShowValue[] = [
        new ShowValue("One Show", "1"),
        new ShowValue("Two Shows", "2"),
        new ShowValue("Three Shows", "3"),
        new ShowValue("Four Shows", "4"),
        new ShowValue("Five Shows", "5")
    ]

    songArray: Song[] = [];
    coversArray: Song[] = []; // references the songArray
    totalCovers = 0;
    purgeSongs: string[] = ['1/30/97 Jam', '12345 678910 11 12', '[interview]', 'Unknown', 'Costume Contest Jam', 'Countdown Medley', 'Disco Bisquick', 'Flip-Flop', 'Fuck That Doll', 'Giveaway', 'Hibbage', 'Ida Fith', 'Jam On The River Song', 'Killing Eleven', 'Koyaanisqatsi Jam', 'Latin Pussy', 'Leora', 'Loch Ness Monster', 'Macina Verde', 'Manic Depression', 'Mariel Bop Bop', 'Marvelous', 'new song', 'Ohayou Gozaimasu', 'Onery Funk', 'Paul Revere', 'Road Song', 'Salute To Sammy', 'Smash', 'Smell The Funk', 'South Of The Border Pussy', 'Sprawl', 'Sugarcane', 'Termites', 'The Great Pumpkin Jam', 'The Truth', 'Tony\'s Birthday Jam', 'Ulua', 'Waltz In Black', 'What A Show', 'Worcester Jam'];

    previousArray: Song[] = []; // references to the songArray
    previousColor = '#f10f0f';
    previousShows = '3';

    cityArray: ShowValue[] = [];
    citySongArray: Song[] = [];
    cityColor = '#0917f3';
    citySelect:string;
    cityShows = '3';

    constructor(private appService: AppService) {}
    
    ngOnInit(): void {
        // get all of the bands songs
        this.appService.getSongs().subscribe(
            showData => { 
                //console.log("Count : " + showData.length);
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
        ); */

        this.appService.getAllLocales().subscribe(
            data => { 
                for( let x = 0; x < data.length; x++ ) {
                    this.cityArray.push( new ShowValue(data[x], x.toString()));
                }
                this.citySelect = '0';
            },
            error => { 
                console.log("Error");
                console.log(error); 
            }
        );
    }

    test(): void {
        console.log("test");
    }

    filterShowData(showData: any[], color: string): Song[] {
        // temp array
        let sArray = [];
                
        // for each show
        showData.forEach(show => {
            //console.log("Show : " + show.name);
            if( show.sets.length > 0 ){
                // for each set
                show.sets.forEach(set => {
                    // for each song
                    set.songs.forEach(song => {
                        // skip the song if it is in the purge array
                        if( this.purgeSongs.indexOf(song.name) ) {
                            let arr = this.songArray.filter(s => s.id === song.id);
                            arr[0].color = color;
                            sArray.push(arr[0]);
                        }
                    });
                });
            } else {
                console.log("No setlist for show " + show.name);
            }
        });

        return sArray;
    }

    getPreviousShows(): void {
        // reset the current 
        this.clearSongs(this.previousArray)
        
        // make the api call to get the previous show data
        this.appService.getPrevious(this.previousShows).subscribe(
            showData => {
                // create a song array of the filtered show data
                let sArray = this.filterShowData(showData, this.previousColor);

                // filter out the duplicates
                this.previousArray = sArray.filter((item, pos) => {
                    return sArray.indexOf(item) == pos;
                })
            },
            error => { console.log(error); }
        );
    }

    setPreviousColorEvent(color: any): void {
        this.previousColor = color;

        this.previousArray.forEach(song => {
            song.color = this.previousColor;
        })
    }

    getLocaleShows(): void {
        //console.log(this.cityArray[this.citySelect].Text)

        this.appService.getLocale(this.cityArray[this.citySelect].Text, this.cityShows).subscribe(
            showData => {
                // create a song array of the filtered show data
                let sArray = this.filterShowData(showData, this.cityColor);

                // filter out the duplicates
                this.citySongArray = sArray.filter((item, pos) => {
                    return sArray.indexOf(item) == pos;
                })
            },
            error => { console.log(error); }
        );
    }

    setCityColorEvent(color: any): void {
        this.cityColor = color;

        this.citySongArray.forEach(song => {
            song.color = this.cityColor;
        })
    }

    /* filterPreviousShows(): void {
        //console.log("filtering...");

        if( this.previousThreeArray.length ){
            this.previousThreeArray.forEach(song => {
                //song.hidden = !song.hidden;
                song.hidden = true;
            })
        }
    } */

    /* clearPreviousShows(): void {
        // reset the current 
        if( this.previousThreeArray ) {
            this.previousThreeArray.forEach(song => {
                song.color = "white";
                song.hidden = false;
            });

            this.previousThreeArray = [];
        }
    } */

    filterOutSongs(songs: Song[]): void {
        //console.log("filtering...");
        if( songs.length ){
            songs.forEach(song => {
                song.hidden = true;
            })
        }
    }

    filterInSongs(songs: Song[]): void {
        if( songs.length ){
            songs.forEach(song => {
                song.hidden = false;
            })
        }
    }

    clearSongs(songs: Song[]): void {
        // reset the current 
        if( songs ) {
            songs.forEach(song => {
                song.color = "white";
                song.hidden = false;
            });

            songs = [];
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
