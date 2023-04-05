import {BaseSchema} from '../base-schema';
import {Rule} from '@angular-devkit/schematics';
import {baseBuilder} from '../base-builder';

export function state(options: BaseSchema): Rule {
    return baseBuilder(options, 'State', false);
}
