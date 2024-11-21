// src/app/app.component.ts
import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  public showPane = false;
  public apiKey = environment.apiKey;
  public userLevel?: number;
  public username?: string;
  public avatar?: string;

  @ViewChild('inputText') inputText?: ElementRef;

  constructor(@Inject(PLATFORM_ID) private _platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      window.addEventListener('message', (event) => {
        // Verifica el origen del mensaje
        if (event.origin !== 'https://tu-dominio-padre.com') return; // Reemplaza con el origen correcto

        if (event.data && event.data.user_level) {
          this.userLevel = event.data.user_level;
          this.username = event.data.username;
          this.avatar = event.data.avatar;
          console.log('User Level:', this.userLevel);
          console.log('Username:', this.username);
          console.log('Avatar:', this.avatar);
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
