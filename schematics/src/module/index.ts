import {Rule} from '@angular-devkit/schematics';
import {BaseSchema} from '../base-schema';
import {baseBuilder} from '../base-builder';

export function module(options: BaseSchema): Rule {
    return baseBuilder(options, 'Module');
}
