import {
    apply,
    chain,
    mergeWith,
    move,
    Rule,
    template,
    url,
} from '@angular-devkit/schematics';
import {normalize, strings} from '@angular-devkit/core';
import {BaseSchema} from './base-schema';

export const baseBuilder = ({path, name}: BaseSchema): Rule => {
    return () => {
        const templateSource = apply(url('./files'), [
            template({...strings, path, name}),
            move(normalize(`${path}/${strings.dasherize(name)}`)),
        ]);

        return chain([mergeWith(templateSource)]);
    };
};
