import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag) // revisa los tags existentes(old) y si son diferentes al nuevo van al array
    }

    this._tagsHistory.unshift(tag); //añade el nuevo tag al inicio
    this._tagsHistory = this.tagsHistory.splice(0, 10); //es listado es máximo 10

  }

  searchTag(tag:string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

  }

}
