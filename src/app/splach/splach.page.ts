import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splach',
  templateUrl: './splach.page.html',
  styleUrls: ['./splach.page.scss'],
})
export class SplachPage implements OnInit {

  constructor(private router: Router) { 

  }

  ngOnInit() {
    setTimeout(()=>{
      this.router.navigateByUrl('home');
    }, 2000);
  }

}
