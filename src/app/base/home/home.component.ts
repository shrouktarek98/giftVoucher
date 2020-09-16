import { Component, OnInit } from '@angular/core';
declare var require: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const testFolder = '../../../assets/images';
    // const fs = require('fs');

    // fs.readdir(testFolder, (err, files) => {
    //   files.forEach(file => {
    //     console.log(file);
    //   });
    // });
  }

}
