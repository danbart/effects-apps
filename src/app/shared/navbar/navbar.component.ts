import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor( private roueter: Router ) { }

  ngOnInit() {
  }

  irUsuario( id: string ) {
    if ( !id ) {
      return;
    }
    this.roueter.navigate(['/usuario', id ]);
  }

}
