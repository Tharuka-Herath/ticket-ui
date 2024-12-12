import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
