module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    'node_modules/',
    'src/main.ts',
    'src/app.module.ts',
    'src/transform.interceptor.ts',
    'src/core/application/dtos/*',
    'src/core/domain/*',
    'src/infrastructure/database/postgres/*',
    'src/pokemon/pokemon.module.ts',
    'src/pokemon/application/dtos/*',
    'src/pokemon/domain/interfaces/*',
    'src/pokemon/infrastructure/*',
  ],
};
