import { Component, ElementRef, Inject, ViewChild} from '@angular/core';
import  {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  public showPane = false;
  public apiKey = environment.apiKey;

@ViewChild('inputText') inputText?: ElementRef;


public togglePane(): void {
  if (this.inputText?.nativeElement.value === this.apiKey) {
    this.showPane = !this.showPane;
  }
}
}
