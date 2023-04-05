import {baseBuilder} from '../base-builder';
import {Rule} from '@angular-devkit/schematics';
import {BaseSchema} from '../base-schema';

export function base(options: BaseSchema): Rule {
    return baseBuilder(options, 'Base component');
}
