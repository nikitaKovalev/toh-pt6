module.exports = {
    '*.{js,ts,html,md,json}': ['npm run lint -- --fix', 'prettier --write', 'git add'],
};
