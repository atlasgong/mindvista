import * as migration_20250402_215618_volunteer_pg from "./20250402_215618_volunteer_pg";
import * as migration_20250402_223601_rootuser from "./20250402_223601_rootuser";

export const migrations = [
    {
        up: migration_20250402_215618_volunteer_pg.up,
        down: migration_20250402_215618_volunteer_pg.down,
        name: "20250402_215618_volunteer_pg",
    },
    {
        up: migration_20250402_223601_rootuser.up,
        down: migration_20250402_223601_rootuser.down,
        name: "20250402_223601_rootuser",
    },
];
