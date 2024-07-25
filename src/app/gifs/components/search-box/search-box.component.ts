import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <input type="text" class="form-control" placeholder="buscar gifs..." (keyup.enter)="searchTag()" #txtTagInput>
  `,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') //view child toma una referencia local
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) {}

 /*  searchTag(newTag: string) { */
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifService.searchTag(newTag);

    this.tagInput.nativeElement.value = "";
  }
}
