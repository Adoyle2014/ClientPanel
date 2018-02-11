import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

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

    constructor(
        public activatedRouter: ActivatedRoute,
        public router: Router,
        public clientService: ClientService
    ) { }

    ngOnInit() {
        this.currentRouterId = this.activatedRouter.snapshot.params.id;

        this.clientService.getClient(this.currentRouterId).subscribe(client => {
            console.log(client);
            this.client = client;
        });
    }

    onDelete() {
        if (confirm(`Do you want to delete user ${this.client.firstName} ${this.client.lastName}?`)) {
            this.clientService.deleteClient(this.client);
            this.router.navigate(['/']);
        }

    }

}
