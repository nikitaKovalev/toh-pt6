import {ChangeDetectionStrategy, Component} from '@angular/core';

import {<%= camelize(name) %>Imports} from './<%=dasherize(name)%>.imports';

@Component({
    standalone: true,
    selector: '<%=dasherize(name)%>',
    templateUrl: '<%=dasherize(name)%>.template.html',
    styleUrls: ['./<%=dasherize(name)%>.style.scss'],
    imports: <%= camelize(name) %>Imports,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>Component {}
