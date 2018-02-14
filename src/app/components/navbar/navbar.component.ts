import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLoggedIn: boolean;
    loggedInUser: string;
    showRegister: boolean;
    constructor(
        private router: Router,
        private flashMessagesService: FlashMessagesService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.getAuth().subscribe(auth => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
            } else {
                this.isLoggedIn = false;
            }
        });
    };

    onLogoutClick() {
        this.authService.logout();
        this.flashMessagesService.show('You are now logged out.',
            { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/login']);
    }

}
