import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    email: string;
    password: string;

    constructor(
        private authService: AuthService,
        private flashMessagesService: FlashMessagesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.getAuth().subscribe(auth => {
            if (auth)
                this.router.navigate(['/']);
        })
    }

    onSubmit() {
        this.authService.register(this.email, this.password)
            .then((res) => {
                this.flashMessagesService.show('User was registered.', {
                    cssClass: 'alert-success',
                    timeout: 4000
                });
                this.router.navigate(['/']);
            })
            .catch(error =>
                this.flashMessagesService.show(error.message, {
                    cssClass: 'alert-danger',
                    timeout: 4000
                })
            );
    }


}
