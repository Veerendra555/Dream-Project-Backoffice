import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  token:boolean=false;
  constructor()
  {
    this.token=!!localStorage.getItem('token');
    console.log(this.token);
  }
}
