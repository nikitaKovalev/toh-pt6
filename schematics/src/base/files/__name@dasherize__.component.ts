import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    standalone: true,
    selector: '<%=dasherize(name)%>',
    templateUrl: '<%=dasherize(name)%>.template.html',
    styleUrls: ['./<%=dasherize(name)%>.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>Component {}
