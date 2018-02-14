import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

//model
import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

    client: Client = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: 0
    };

    disabledBalanceOnAdd: boolean = true;
    @ViewChild('clientForm') form: any;

    constructor(
        private clientService: ClientService,
        private settingsService: SettingsService,
        private flashMessagesService: FlashMessagesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.disabledBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
    }

    onSubmit() {
        if (!this.form.valid) {
            this.flashMessagesService.show('Please fill the form', {
                timeout: 4000,
                cssClass: 'alert-danger'
            })
        } else {
            this.clientService.newClient(this.client);
            this.flashMessagesService.show('New client was added', {
                timeout: 4000,
                cssClass: 'alert-success'
            });
            this.router.navigate(['/']);
        }

  }

}
