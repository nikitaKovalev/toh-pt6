import {Component} from '@angular/core';
import {MESSAGES_IMPORTS} from '@app/messages/ui/messages.imports';

import {MessageService} from '../data-access/message.service';

@Component({
    standalone: true,
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    imports: MESSAGES_IMPORTS,
})
export class MessagesComponent {
    constructor(public messageService: MessageService) {}
}
