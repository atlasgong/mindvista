import * as migration_20250221_232941_add_versioning_to_legals from './20250221_232941_add_versioning_to_legals';

export const migrations = [
  {
    up: migration_20250221_232941_add_versioning_to_legals.up,
    down: migration_20250221_232941_add_versioning_to_legals.down,
    name: '20250221_232941_add_versioning_to_legals'
  },
];
