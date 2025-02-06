import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    parserPreset: "conventional-changelog-atom",
    formatter: "@commitlint/format",
    rules: {
        "type-enum": [RuleConfigSeverity.Error, "always", ["build", "ci", "cms", "merge", "content", "feat", "fix", "resp", "a11y", "ui", "ux", "perf", "sec", "refactor", "seo", "legal", "docs", "other"]],
        "selective-scope": [
            RuleConfigSeverity.Error,
            "always",
            {
                build: [null, "deps", "deps-dev"],
            },
        ],
    },
    plugins: ["selective-scope"],
    helpUrl: "https://github.com/atlasgong/mindvista/blob/master/CONTRIBUTING.md",
};

export default Configuration;
