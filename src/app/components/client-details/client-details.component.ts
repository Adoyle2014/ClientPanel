import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
//model
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

    client: Client;
    currentRouterId: string;
    hasBalance: boolean = false;
    showBalanceUpdateInput: boolean = false;
    constructor(
        public activatedRouter: ActivatedRoute,
        public router: Router,
        public clientService: ClientService,
        private flashMessage: FlashMessagesService
    ) { }

    ngOnInit() {
        this.currentRouterId = this.activatedRouter.snapshot.params.id;

        this.clientService.getClient(this.currentRouterId).subscribe(client => {
            if (client) {
                if (client.balance > 0) {
                    this.hasBalance = true;
                };
                this.client = client;
            }
        });
    };

    onDelete() {
        if (confirm(`Do you want to delete user ${this.client.firstName} ${this.client.lastName}?`)) {
            this.clientService.deleteClient(this.client);
            this.flashMessage.show('User was removed.',
                { cssClass: 'alert-success', timeout: 4000 });
            this.router.navigate(['/']);
        }
    };

    updateBalance() {
        this.clientService.updateClient(this.client);
        this.flashMessage.show('Balance was updated.',
            { cssClass: 'alert-success', timeout: 4000 });
        this.showBalanceUpdateInput = false;
    }

}
