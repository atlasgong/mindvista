import * as migration_20250403_154007_remove_root from "./20250403_154007_remove_root";
import * as migration_20250409_185348_versioning_drafts_events from "./20250409_185348_versioning_drafts_events";

export const migrations = [
    {
        up: migration_20250403_154007_remove_root.up,
        down: migration_20250403_154007_remove_root.down,
        name: "20250403_154007_remove_root",
    },
    {
        up: migration_20250409_185348_versioning_drafts_events.up,
        down: migration_20250409_185348_versioning_drafts_events.down,
        name: "20250409_185348_versioning_drafts_events",
    },
];
