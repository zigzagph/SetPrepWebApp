import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { SongComponent } from './song/song.component';

import { ColorPickerModule } from 'narik-angular-color-picker';

@NgModule({
    declarations: [
        AppComponent,
        SongComponent
    ],
    imports: [
        BrowserModule, HttpClientModule, ColorPickerModule, FormsModule, AngularFontAwesomeModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
