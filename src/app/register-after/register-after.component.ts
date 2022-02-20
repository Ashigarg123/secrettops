import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-after',
  templateUrl: './register-after.component.html',
  styleUrls: ['./register-after.component.css']
})
export class RegisterAfterComponent implements OnInit {
  click: boolean = false;
  constructor() {
    this.click = !this.click;
  }

  ngOnInit(): void {
  }

}
