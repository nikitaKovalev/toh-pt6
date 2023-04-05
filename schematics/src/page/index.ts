import {Rule} from '@angular-devkit/schematics';
import {baseBuilder} from '../base-builder';
import {BaseSchema} from '../base-schema';

export function page(options: BaseSchema): Rule {
    return baseBuilder(options, 'Page component');
}
