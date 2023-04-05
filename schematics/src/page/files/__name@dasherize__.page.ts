import {ChangeDetectionStrategy, Component} from '@angular/core';

import {<%= camelize(name) %>Imports} from './<%=dasherize(name)%>.imports';

@Component({
    standalone: true,
    templateUrl: '<%=dasherize(name)%>.page.html',
    styleUrls: ['./<%=dasherize(name)%>.page.scss'],
    imports: <%= camelize(name) %>Imports,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class <%= classify(name) %>Page {}
