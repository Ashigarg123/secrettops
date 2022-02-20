import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private logService: LoginService) { }

  ngOnInit(): void {
  }
  register() {
    this.logService.register().subscribe(
      (data) => {
        console.log(data)
        alert("Registered in")
      },
      (error) => console.log(error)
    )

  }
}
