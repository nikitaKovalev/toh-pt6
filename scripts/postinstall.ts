import {execSync} from 'child_process';

(function main(): void {
    execSync(
        `
    husky install || echo 'skip error'
    cd ./schematics/ && npm install && npm run build || echo 'skip error'
    cd ../ && npm link ./schematics
    `,
        {stdio: `inherit`},
    );
})();

// husky add .husky/pre-commit "npm run lint-staged" || echo 'skip error' ??
