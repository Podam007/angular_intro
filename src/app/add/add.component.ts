import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  // tslint:disable-next-line: no-use-before-declare
  model = new Member();
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  async save() {
    const rs: any = await this.apiService.portdata(this.model);
    if (rs.ok) {
      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      // tslint:disable-next-line: no-use-before-declare
      this.model = new Member();
      this.ngOnInit();
    }
  }

}

export class Member {
  id: number;
  cid: string;
  name: string;
  lname: string;
}
