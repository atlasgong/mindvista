import * as migration_20250228_031847_payload_about from './20250228_031847_payload_about';
import * as migration_20250323_024739_payload_about from './20250323_024739_payload_about';

export const migrations = [
  {
    up: migration_20250228_031847_payload_about.up,
    down: migration_20250228_031847_payload_about.down,
    name: '20250228_031847_payload_about',
  },
  {
    up: migration_20250323_024739_payload_about.up,
    down: migration_20250323_024739_payload_about.down,
    name: '20250323_024739_payload_about'
  },
];
