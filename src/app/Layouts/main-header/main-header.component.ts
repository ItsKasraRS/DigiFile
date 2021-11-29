import { LoginComponent } from './../../Pages/login/login.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) 
  { }

  ngOnInit(): void {
  }

  LoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }
}
