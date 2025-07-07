import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonFooter, IonicModule} from '@ionic/angular';

@Component({
  selector: 'footer-loading',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true
})
export class FooterLoadingComponent  implements OnInit {
  @Input("loading")
  loading : boolean = false;
  constructor() { }

  ngOnInit() {}
}
