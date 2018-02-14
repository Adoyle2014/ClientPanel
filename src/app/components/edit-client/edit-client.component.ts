import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
//model
import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
    client: Client;
    currentRouterId: string;
    disableBalanceOnEdit: boolean = true;

    constructor(
        public activatedRouter: ActivatedRoute,
        public router: Router,
        public clientService: ClientService,
        private settingsService: SettingsService,
        private flashMessagesService: FlashMessagesService

    ) { }

    ngOnInit() {
        this.currentRouterId = this.activatedRouter.snapshot.params.id;

        this.clientService.getClient(this.currentRouterId).subscribe(client => {
            if (client) {
                this.client = client;
            }
        });
        this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
        console.log(this.disableBalanceOnEdit);
    }

    onSubmit(form) {
        if (!form.valid) {
            this.flashMessagesService.show('Please fill the form', {
                timeout: 4000,
                cssClass: 'alert-danger'
            })
        } else {
            this.clientService.updateClient(this.client);
            this.flashMessagesService.show('Client was updated successfully', {
                timeout: 4000,
                cssClass: 'alert-success'
            });
            this.router.navigate([`client/${this.currentRouterId}`]);
        }

    }



}
