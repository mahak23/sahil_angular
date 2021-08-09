import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private commonService: CommonService) {
    const emailRegex = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(emailRegex),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),],
      password: ["",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]),]
    });
  }


  onSignIn() {
    if (this.loginForm.valid) {
      this.commonService.login(this.loginForm.value).subscribe(res => {
        console.log('res--', res);
        if (res) {
          this.router.navigate(['/userList']);
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'success!', text: "Login Successfully", icon: 'success', });

        }
      }, error => {
        console.log(error)
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'danger!', text: error.error?.message, icon: 'error', });

      });
    }

  }
  ngOnInit(): void {
  }

}
