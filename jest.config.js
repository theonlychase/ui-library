module.exports = {
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  roots: ['<rootDir>/src/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'],
};
