import { Component } from '@angular/core';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports: [
    MatAnchor,
    RouterLink,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
