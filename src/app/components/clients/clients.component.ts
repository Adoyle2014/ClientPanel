import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

//model
import { Client } from '../../models/Client';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    clients: Client[];
    totalOwned: number;
    constructor(
        private clientService: ClientService
    ) { }

    ngOnInit() {
        this.clientService.getClients().subscribe(clients => {
            console.log(clients);
            this.clients = clients;
            this.totalOwned = this.getTotalOwned();
        });
    }

    getTotalOwned() {
        return this.clients.reduce((total, client) => {
            return total += +client.balance;
        }, 0);
    }

}
