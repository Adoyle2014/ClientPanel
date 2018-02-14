import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/settings';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    settings: Settings;
    constructor(
        public router: Router,
        public settingsService: SettingsService,
        private flashMessage: FlashMessagesService

    ) { }

    ngOnInit() {
        this.settings = this.settingsService.getSettings();
    }
    onSubmit() {
        this.settingsService.changeSettings(this.settings);
        this.flashMessage.show('Settings saved.',
            { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/']);

    }

}
