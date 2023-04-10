import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    Tree,
    url,
} from '@angular-devkit/schematics';
import {BaseSchema} from '../base-schema';
import {normalize, strings} from '@angular-devkit/core';

export function module({path, name}: BaseSchema): Rule {
    return (tree: Tree, context) => {
        if (!name) {
            context.logger.error(`🚫 Module Name is required!`);
            return;
        }

        context.logger.info(`🚀 Creating Module ${name}...`);

        const subFolder = `${strings.dasherize(name)}/`;
        const templateSource = apply(url('./files'), [
            applyTemplates({...strings, name}),
            move(normalize(`${path}/${subFolder}`)),
        ]);

        const tsconfigPath = 'tsconfig.json';
        const tsconfigBuffer = tree.read(tsconfigPath);

        if (tsconfigBuffer) {
            const tsconfigContent = tsconfigBuffer.toString();
            context.logger.info(JSON.parse(tsconfigBuffer.toString()));
            const tsconfig = JSON.parse(tsconfigContent);
            const modulePath = `@${name}/*`;
            const moduleSrcPath = `${path}/${subFolder}*`;

            // Add the module path to the tsconfig file if it doesn't exist
            if (!tsconfig.compilerOptions.paths[modulePath]) {
                tsconfig.compilerOptions.paths[modulePath] = [moduleSrcPath];
            }

            // Update the module path in the tsconfig file if it exists
            if (tsconfig.compilerOptions.paths[modulePath]) {
                tsconfig.compilerOptions.paths[modulePath] = [moduleSrcPath];
            }

            // Write the updated tsconfig file to the tree
            tree.overwrite(tsconfigPath, JSON.stringify(tsconfig, null, 2));
        }

        return chain([mergeWith(templateSource)]);
    };
}
