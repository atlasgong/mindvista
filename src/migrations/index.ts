import * as migration_20250403_154007_remove_root from "./20250403_154007_remove_root";

export const migrations = [
    {
        up: migration_20250403_154007_remove_root.up,
        down: migration_20250403_154007_remove_root.down,
        name: "20250403_154007_remove_root",
    },
];
