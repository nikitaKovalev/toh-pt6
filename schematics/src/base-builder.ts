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

export const baseBuilder = (
    {path, name}: BaseSchema,
    prefix: string,
    createSubFolder = true,
): Rule => {
    return (_, context) => {
        if (!name) {
            context.logger.error(`🚫 ${prefix} Name is required!`);
            return;
        }

        context.logger.info(`🚀 Creating ${prefix} ${name}...`);

        const subFolder = createSubFolder ? `${strings.dasherize(name)}/` : '';
        const templateSource = apply(url('./files'), [
            template({...strings, path, name}),
            move(normalize(`${path}/${subFolder}`)),
        ]);

        return chain([mergeWith(templateSource)]);
    };
};
