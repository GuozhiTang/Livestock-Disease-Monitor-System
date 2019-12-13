import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, RequestOptionsArgs, RequestMethod, Headers, Request } from '@angular/http';

@Injectable()
export class IpfsService {
  result: any;

  ipfsEndpoint = 'http://localhost:4201/upload/ipfs';
  ipfsapi = 'http://localhost:5001/api/v0/add';
  constructor(
    private http: Http
  ) { }

  // fileChange(fileList: FileList) {
  //   if (fileList.length > 0) {
  //     const file : File = fileList[0];
  //     const formData : FormData = new FormData();
  //     formData.append('uploadFile', file);

  //     return this.http.post(this.ipfsEndpoint, formData)
  //       .map(res => res.json());
  //   }
  // }


  // fileChange(fileList: FileList) {
  //   if (fileList.length > 0) {
  //     const file : File = fileList[0];
  //     console.log(file);

  //     let headers = new Headers();
  //     headers.append('Content-Type', 'application/json');
  //     const formData: FormData = new FormData();
  //     formData.append('uploadFile', file);

  //     this.result = this.http.post(this.ipfsEndpoint, formData, {headers: headers})
  //       .map(res => res.json());
  //     console.log(this.result);
  //     return this.result;
  //   }
  // }

  fileChange(fileList: FileList) {
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file);
      const headers = new Headers();
      headers.append('Accept', 'application/json');

      const basicOptions: RequestOptionsArgs = {
        url: this.ipfsEndpoint,
        method: RequestMethod.Post,
        headers: headers,
        body: formData
      };

      const options = new RequestOptions(basicOptions);
      return this.http.request(new Request(options))
        .map(res => res.json());
      // this.result = this.http.request(new Request(options))
      // .map(res => res.json());
      // console.log(this.result);
      // return this.result;
    }
  }

  getBase64(files, callback) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function (readerEvt) {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }

}
