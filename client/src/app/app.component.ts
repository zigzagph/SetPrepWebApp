import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    constructor(private appService: AppService) {}
    
    ngOnInit(): void {

        this.appService.getSongs().subscribe(
            data => { 
                console.log("GS Return");
                console.log(data);
                //console.log(typeof data) 
            },
            error => { 
                console.log("Error");
                console.log(error); 
            }
        );

        this.appService.getVenues().subscribe(
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
        );

        this.appService.getPrevious().subscribe(
            data => { 
                console.log("GP Return");
                console.log(data);
                //console.log(typeof data) 
            },
            error => { 
                console.log("Error");
                console.log(error); 
            }
        );
    }

}
