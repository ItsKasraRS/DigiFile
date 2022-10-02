import { Component, OnInit } from '@angular/core';
import { ScriptLoader } from 'src/app/Utilities/script-loader';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ScriptLoader.prototype.loadScript('/assets/js/scripts.js')
  }

}
