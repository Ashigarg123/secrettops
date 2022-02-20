import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login1: any;
  constructor(private logService: LoginService) { }

  ngOnInit(): void {
  }
  login(username: any, password: any) {
    this.logService.login(username, password).subscribe(
      (data) => {
        console.log(data)
        alert("Logged in")
      },
      (error) => console.log(error)
    )

  }
}
