import { Component, Inject } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'share-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor (private gifsService: GifsService) {}

  get tags() {
    return this.gifsService.tagsHistory;
  }
}
