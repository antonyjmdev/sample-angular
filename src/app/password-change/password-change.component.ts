import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProfileService } from '../profile.service';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  submitted : boolean;
  editSuccess : boolean;
  dataReturn : boolean;
  formErrors : JSON;
  passwordChangeForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private profileService : ProfileService) { }

  ngOnInit(): void {
    this.passwordChangeForm = this.formBuilder.group({
      password1 : ['', Validators.required],
      password2 : ['', Validators.required]
    });
    this.editSuccess = false;
    this.submitted = false;
    this.dataReturn = false;
  }

    public get f(){
      return this.passwordChangeForm.controls;
    }
  changePassword(pass1, pass2){
    let bodyParams = { "new_password1":pass1, "new_password2":pass2};
    this.profileService.changePassword(bodyParams).subscribe(
      data => {
        this.dataReturn = true;
        this.editSuccess = true;
      },
      error => {
        this.dataReturn = true;
        this.editSuccess = false;
        this.formErrors = error.error;
      }
    );
  }
  onSubmit(){
    this.submitted = true;
    this.dataReturn = false;
    this.formErrors = JSON.parse("{}");
    if(this.passwordChangeForm.invalid){
      return;
    }

    
    this.changePassword(this.f.password1.value, this.f.password2.value);
  }

}
