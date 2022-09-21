import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSun: Boolean = false;
  chageSun() {
    this.isSun = !this.isSun;
    document.body.style.background = this.isSun ? '#B28920' : '#121C41';
  }
}
