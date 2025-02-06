import * as migration_20250206_053130_localize_events from "./20250206_053130_localize_events";

export const migrations = [
    {
        up: migration_20250206_053130_localize_events.up,
        down: migration_20250206_053130_localize_events.down,
        name: "20250206_053130_localize_events",
    },
];
