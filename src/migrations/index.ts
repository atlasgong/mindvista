import * as migration_20250403_003328_announcement_bar from "./20250403_003328_announcement_bar";

export const migrations = [
    {
        up: migration_20250403_003328_announcement_bar.up,
        down: migration_20250403_003328_announcement_bar.down,
        name: "20250403_003328_announcement_bar",
    },
];
