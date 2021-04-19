import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient) {}

  pushFileToBack(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8080/rover/doUploadFile', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


  public sendDataToBack(body) {
    const req = new HttpRequest('POST', 'http://localhost:8080/rover/doUploadData', body, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
