import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  profile;
  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
      this.profileService.getProfile().subscribe(
        data => {
          this.profile = data;
          
        },
        error => {
          console.log(error);
        }
      );
  }



}
