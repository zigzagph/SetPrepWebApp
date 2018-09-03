import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song';

@Component({
    selector: 'app-song',
    templateUrl: './song.component.html',
    styles: []
})
export class SongComponent implements OnInit {
    @Input() song: Song;
    
    constructor() { }

    ngOnInit() {}

}
