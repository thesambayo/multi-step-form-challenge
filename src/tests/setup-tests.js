import "@testing-library/jest-dom";
import { configure, cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

configure({ testIdAttribute: "data-test-id", asyncUtilTimeout: 3000 });

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
});
