import * as migration_20250403_154007_remove_root from "./20250403_154007_remove_root";
import * as migration_20250430_051055_sentinel from "./20250430_051055_sentinel";
import * as migration_20250525_183845_about_pg from "./20250525_183845_about_pg";

export const migrations = [
    {
        up: migration_20250403_154007_remove_root.up,
        down: migration_20250403_154007_remove_root.down,
        name: "20250403_154007_remove_root",
    },
    {
        up: migration_20250430_051055_sentinel.up,
        down: migration_20250430_051055_sentinel.down,
        name: "20250430_051055_sentinel",
    },
    {
        up: migration_20250525_183845_about_pg.up,
        down: migration_20250525_183845_about_pg.down,
        name: "20250525_183845_about_pg",
    },
];
