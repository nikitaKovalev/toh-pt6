import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    standalone: true,
    templateUrl: '<%=dasherize(name)%>.page.html',
    styleUrls: ['./<%=dasherize(name)%>.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>Page {}
