import * as migration_20250402_215618_volunteer_pg from "./20250402_215618_volunteer_pg";

export const migrations = [
    {
        up: migration_20250402_215618_volunteer_pg.up,
        down: migration_20250402_215618_volunteer_pg.down,
        name: "20250402_215618_volunteer_pg",
    },
];
