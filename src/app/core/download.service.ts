import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor() {}

  public download(blob, name): void {
    const url = URL.createObjectURL(blob),
      div = document.createElement('div'),
      anch = document.createElement('a');

    document.body.appendChild(div);
    div.appendChild(anch);

    anch.innerHTML = '&nbsp;';
    div.style.width = '0';
    div.style.height = '0';
    anch.href = url;
    anch.download = name;

    const ev = new MouseEvent('click', {});
    anch.dispatchEvent(ev);
    document.body.removeChild(div);
  }
}
