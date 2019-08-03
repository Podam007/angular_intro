import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  datauser: any;

  constructor(
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    const data = this.jwtService.jwtexpired();
    if (data) {
      this.datauser = this.jwtService.decodeToken();
    }
  }

  doLogout() {
    localStorage.removeItem('tokenlab');
    window.location.reload();
  }

}
