module.exports = {
  '*.json': (files) => {
    return [
      'sort-package-json',
      ...files.map((f) => `prettier --write ${f}`),
      `git add ${files.join(' ')}`,
    ];
  },
  '*.md': (files) => {
    return [...files.map((f) => `prettier --write ${f}`)];
  },
  '*.{css}': (files) => {
    return [
      ...files
        .filter((f) => !f.includes('lint-staged.config.js'))
        .map((f) => `prettier --write ${f}`),
    ];
  },
  '*.{js,jsx,ts,tsx}': (orgFiles) => {
    const filesPaths = orgFiles.join(' ');
    return [
      ...orgFiles
        .filter((f) => !f.includes('lint-staged.config.js'))
        .map((f) => `prettier --write ${f}`),
      `eslint --fix --ext .js --ext .ts --ext .tsx --ext .jsx ${filesPaths}`,
      `jest --findRelatedTests --passWithNoTests ${filesPaths}`,
      `git add ${orgFiles.join(' ')}`,
    ];
  },
};
