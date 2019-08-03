import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showData: any;
  // tslint:disable-next-line: no-use-before-declare
  model = new Member();

  showedit = false;
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.GET_data();
  }

  async  GET_data() {
    const rs: any = await this.apiService.getdata();
    if (rs.ok) {
      this.showData = rs.res;
    }
  }

  toadd() {
    this.router.navigate(['layout/add']);
  }

  async del(id) {
    const rs: any = await this.apiService.deldata({ id });
    if (rs.ok) {
      alert('ลบข้อมูลเรียบร้อย');
      this.ngOnInit();
    }
  }


  edit(item) {
    this.showedit = true;
    this.model = item;
  }

  async save() {
    const rs: any = await this.apiService.portdata(this.model);
    if (rs.ok) {
      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      // tslint:disable-next-line: no-use-before-declare
      this.model = new Member();
      this.showedit = false;
      this.ngOnInit();
    }
  }

  cl() {
    // tslint:disable-next-line: no-use-before-declare
    this.model = new Member();
    this.showedit = false;
  }

}


export class Member {
  id: number;
  cid: string;
  name: string;
  lname: string;
}
