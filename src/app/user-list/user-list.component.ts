import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public userData: any = [];
  public page = 1;
  public limit = 10;
  public search = "";
  public startDate = "";
  public endDate = "";
  public status = "pending";
  constructor(private router: Router, private formBuilder: FormBuilder, private commonService: CommonService) { }

  // Tpo get all list
  getList() {
    let conditions =
      "page=" +
      this.page +
      "&limit=" +
      this.limit +
      "&search=" +
      this.search +
      "&startDate=" +
      this.startDate +
      "&endDate=" +
      this.endDate +
      "status=" +
      this.status;
    this.commonService.getUserList(conditions).subscribe(res => {
      if (res) {
        this.userData = res.data;
      }
    }, error => {
      console.log(error)
    });
  }

  // To update doctor status
  updateStatus(userId: any) {
    let data = {
      doctor_id: userId,
      status: 'pending'
    }
    this.commonService.updateStatus(data).subscribe(res => {
      if (res) {
        this.getList()
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'success!', text: "Status Updated Successfully", icon: 'success', });
      }
    }, error => {
      console.log(error)
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'danger!', text: error.error?.message, icon: 'error', });

    });

  }


  ngOnInit(): void {
    this.getList();
  }

}
