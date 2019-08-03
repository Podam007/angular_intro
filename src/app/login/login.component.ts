import { JwtService } from './../jwt.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  texterror = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    const data = this.jwtService.jwtexpired();
    if (data) {
      this.router.navigate(['layout/home']);
    }
  }


  async  doLogin() {
    const rs: any = await this.apiService.login(this.username, this.password);
    if (rs.ok) {
      localStorage.setItem('tokenlab', rs.data);
      window.location.reload();
    } else {
      this.texterror = true;
    }
  }

}
