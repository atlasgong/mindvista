import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    parserPreset: "conventional-changelog-atom",
    formatter: "@commitlint/format",
    rules: {
        "type-enum": [RuleConfigSeverity.Disabled, "always", ["build", "ci", "cms", "test", "merge", "content", "feat", "fix", "resp", "a11y", "ui", "ux", "perf", "sec", "refactor", "seo", "legal", "docs", "other"]],
        "type-empty": [RuleConfigSeverity.Disabled],
        "subject-empty": [RuleConfigSeverity.Disabled],
        "header-min-length": [RuleConfigSeverity.Error, "always", 12],
        "header-max-length": [RuleConfigSeverity.Error, "always", 72],
        "body-max-length": [RuleConfigSeverity.Disabled],
    },
    helpUrl: "https://github.com/MindVista/website/wiki/Commit-Guidelines",
    defaultIgnores: true,
};

export default Configuration;
