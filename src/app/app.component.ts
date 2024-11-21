import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import  {environment} from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit{
  public showPane = false;
  public apiKey = environment.apiKey;
  public userLevel?: string;

@ViewChild('inputText') inputText?: ElementRef;

constructor(@Inject(PLATFORM_ID) private _platformId: any){}

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      window.addEventListener('message', (event) => {
        // Verifica el origen del mensaje
        if (event.origin !== 'https://my-testing-forum-1.forumotion.com/') return;

        if (event.data && event.data.userlevel) {
          this.userLevel = event.data.userlevel;
          console.log('User Level:', this.userLevel);
        }
      });
    }
  }

public togglePane(): void {
  if (this.inputText?.nativeElement.value === this.apiKey) {
    this.showPane = !this.showPane;
  }
}
}
