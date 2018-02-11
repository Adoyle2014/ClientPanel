import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//models
import { Client } from '../models/client';
@Injectable()
export class ClientService {

    clientsCollection: AngularFirestoreCollection<Client>;
    clientDoc: AngularFirestoreDocument<Client>;
    clients: Observable<Client[]>;
    client: Observable<Client>;

    constructor(
        private afs: AngularFirestore

    ) {
        this.clientsCollection = this.afs.collection<Client>('clients', ref => ref.orderBy('lastName'));
    }

    getClients(): Observable<Client[]> {
        this.clients = this.clientsCollection.snapshotChanges().map(
            collection => {
                return collection.map(document => {
                    const data = document.payload.doc.data() as Client;
                    data.id = document.payload.doc.id;
                    return data;
                })
            });
        return this.clients;
    }

    getClient(id: string): Observable<Client> {
        this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
        console.dir( this.clientDoc);
        this.client = this.clientDoc.snapshotChanges().map(action => {
            console.log('action', action);

            if (action.payload.exists === false) {
                console.log('false');

                return null;
            } else {
                console.log('true');

                const data = action.payload.data() as Client;
                data.id = action.payload.id;
                console.log(data);
                return data;
            }
        });

        return this.client;
    }

    newClient(client) {
        this.clientsCollection.add(client);
    }

    deleteClient(client: Client) {
        this.clientDoc = this.afs.doc(`clients/${client.id}`);
        this.clientDoc.delete();
    }
}
