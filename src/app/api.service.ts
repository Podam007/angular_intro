import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  login(username: string, password: string) {
    const url = `http://203.157.182.3:3000/sign`;
    const rs: any = this.http.post(url, { username, password }).toPromise();
    return rs;
  }

  getdata() {
    const url = `http://203.157.182.3:3000/referout/member`;
    const rs: any = this.http.get(url).toPromise();
    return rs;
  }

  portdata(formData) {
    const url = `http://203.157.182.3:3000/referout/member`;
    const rs: any = this.http.post(url, formData).toPromise();
    return rs;
  }

  deldata(formData) {
    const url = `http://203.157.182.3:3000/referout/member/del`;
    const rs: any = this.http.post(url, formData).toPromise();
    return rs;
  }
}
