import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    parserPreset: "conventional-changelog-atom",
    formatter: "@commitlint/format",
    rules: {
        "type-enum": [RuleConfigSeverity.Error, "always", ["build", "ci", "cms", "test", "merge", "content", "feat", "fix", "resp", "a11y", "ui", "ux", "perf", "sec", "refactor", "seo", "legal", "docs", "other"]],
    },
    helpUrl: "https://github.com/atlasgong/mindvista/wiki/Commit-Guidelines",
    defaultIgnores: true,
};

export default Configuration;
