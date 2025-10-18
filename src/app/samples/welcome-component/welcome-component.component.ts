import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-component',
  standalone: false,
  templateUrl: './welcome-component.component.html',
  styleUrl: './welcome-component.component.css'
})
export class WelcomeComponentComponent {
  title: string = 'Welcome to Our Application';

  constructor() { }

  public getWelcomeMessage(): string {
    return this.title;
  }


}
