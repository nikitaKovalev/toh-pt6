import {execSync} from 'child_process';

(function main(): void {
    execSync(`husky install || echo 'skip error'`, {stdio: `inherit`});
})();
