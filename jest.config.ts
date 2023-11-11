import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	coverageDirectory: "coverage",
	collectCoverageFrom: ["lib/**/*.ts"],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0
		}
	},
	// moduleNameMapper: {
	// 	"lib/(.*)": "<rootDir>/lib/*"
	// },
	moduleDirectories: ["node_modules", "src"]
};

export default config;
