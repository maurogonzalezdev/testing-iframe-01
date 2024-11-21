// src/app/app.component.ts
import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';

declare global {
  interface Window {
    _userdata: any;
  }
}

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
      // Intento de acceso directo (solo si mismo origen)
      try {
        const parentWindow = window.parent as any;
        if (parentWindow && parentWindow._userdata) {
          this.userLevel = parentWindow._userdata.user_level;
          this.username = parentWindow._userdata.username;
          this.avatar = parentWindow._userdata.avatar;
          console.log('User Level (Direct Access):', this.userLevel);
          console.log('Username (Direct Access):', this.username);
          console.log('Avatar (Direct Access):', this.avatar);
        } else {
          console.warn('_userdata no está definido en la ventana padre.');
        }
      } catch (error) {
        console.error('Error accediendo a _userdata directamente:', error);
      }

      // Escucha de mensajes vía postMessage
      window.addEventListener('message', (event) => {
        // Reemplaza con el origen correcto de la página padre
        if (event.origin !== 'https://my-testing-forum-1.forumotion.com') return;

        if (event.data) {
          if (typeof event.data.user_level === 'number') {
            this.userLevel = event.data.user_level;
            console.log('User Level (postMessage):', this.userLevel);
          }

          if (typeof event.data.username === 'string') {
            this.username = event.data.username;
            console.log('Username (postMessage):', this.username);
          }

          if (typeof event.data.avatar === 'string') {
            this.avatar = event.data.avatar;
            console.log('Avatar (postMessage):', this.avatar);
          }
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
