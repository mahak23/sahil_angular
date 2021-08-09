import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private commonService: CommonService) {
    const emailRegex = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),],
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


  onSignUp() {
    if (this.signUpForm.valid) {
      this.commonService.signUp(this.signUpForm.value).subscribe(res => {
        console.log('res--', res);
        if (res) {
          this.router.navigate(['/userList']);
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'success!', text: "Register Successfully", icon: 'success', });
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
