import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

// const GIPHY_API_KEY = '4HHAtXjGoLaWrPqux4k55JpCBYlX48Dv';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '4HHAtXjGoLaWrPqux4k55JpCBYlX48Dv';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();

  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag); // revisa los tags existentes(old) y si son diferentes al nuevo van al array
    }

    this._tagsHistory.unshift(tag); //añade el nuevo tag al inicio
    this._tagsHistory = this.tagsHistory.splice(0, 10); //es listado es máximo 10
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);  //al recargar se muestren los gifs del primer tag de busqueda
  }

  /*  async searchTag(tag:string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    fetch('https://api.giphy.com/v1/gifs/search?api_key=4HHAtXjGoLaWrPqux4k55JpCBYlX48Dv&q=ot&limit=10')
      .then(resp => resp.json())
      .then(data => console.log(data));
  } */

  /* async searchTag(tag:string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=4HHAtXjGoLaWrPqux4k55JpCBYlX48Dv&q=ot&limit=10');
    const data = await resp.json();
    console.log(data)
  } */

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        // console.log({gifs: this.gifList});
      });
  }
}
