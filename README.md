# Playwright Web and API Automation Framework

An end-to-end test automation framework built with [Playwright](https://playwright.dev/), TypeScript, and Node.js. The project contains browser-based web tests, API tests, reusable page objects, API helpers, fixtures, schema validation, and test reporting.

## What This Project Covers

- Web UI automation using the Playwright Chromium project
- API automation using Playwright API requests
- Page Object Model for reusable web actions
- Shared web and API fixtures
- Environment-specific configuration through dotenv
- HTML, Allure, and Reporting Labs test reports
- Screenshots, videos, and traces for failed or retried tests

## Prerequisites

Install the following before using the project:

- Node.js 18 or newer
- npm (included with Node.js)
- Git

Check your versions:

```bash
node --version
npm --version
```

## Installation

Clone the repository and install its dependencies:

```bash
git clone <repository-url>
cd Playwright_Framework
npm install
npx playwright install chromium
```

The project currently runs Chromium by default. Install the other browsers only if you enable their projects in `playwright.config.ts`:

```bash
npx playwright install firefox webkit
```

## Environment Configuration

The test environment is selected with the `ENV` variable. The default is `qa`:

```text
ENV=qa npx playwright test
```

Environment files are stored in `config/`:

```text
config/.env.dev
config/.env.qa
config/.env.stage
```

The QA configuration uses these values:

| Variable | Purpose |
| --- | --- |
| `BASE_URL` | Base URL for web tests |
| `APP_USERNAME` | Application login username |
| `APP_PASSWORD` | Application login password |
| `API_BASE_URL` | Base URL used by the shared API fixture |
| `API_TOKEN` | Token for authenticated GoREST tests |
| `OAUTH_CLIENT_ID` | OAuth client ID for Spotify tests |
| `OAUTH_CLIENT_SECRET` | OAuth client secret for Spotify tests |
| `GRANT_TYPE` | OAuth grant type |

Create or update the environment file you need before running tests. Never commit real passwords, API tokens, or OAuth secrets. The `config/.env.*` pattern is ignored by Git, so each developer or CI job should provide its own values.

On Windows PowerShell, set the environment for one run like this:

```powershell
$env:ENV = "qa"
npx playwright test
```

On macOS/Linux:

```bash
ENV=qa npx playwright test
```

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run a specific file:

```bash
npx playwright test tests/loginpage.spec.ts
```

Run only API tests:

```bash
npx playwright test tests/api
```

Run selected web tests:

```bash
npx playwright test tests/homepage.spec.ts tests/loginpage.spec.ts tests/searchpage.spec.ts
```

Run a test by title:

```bash
npx playwright test -g "Logout link exists"
```

Run with the browser visible while debugging:

```bash
npx playwright test --headed
```

Open Playwright Inspector for step-by-step debugging:

```bash
npx playwright test --debug
```

The configured defaults are four workers, a 10-second test timeout, headless Chromium, and retries on CI only.

## Test Reports

The test run creates these outputs:

- Playwright HTML report: `playwright-report/`
- Allure result files: `allure-results/`
- Reporting Labs report: `reporting-labs/`
- Failure artifacts: `test-results/`

Open the Playwright HTML report:

```bash
npx playwright show-report
```

Generate and open an Allure report:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

`allure-results/`, `playwright-report/`, `reporting-labs/`, and `test-results/` are generated artifacts and are intentionally ignored by Git. The Reporting Labs configuration keeps run history in `reporting-labs.history.json`.

## Project Structure

```text
config/                 Environment files (.env.dev, .env.qa, .env.stage)
src/
	api/                  Reusable API helpers
	fixtures/             Shared Playwright fixtures
	pages/                Page Object Model classes
	schema/               API response schemas
	testdata/             Reusable test data
	utils/                Shared utilities
tests/
	api/                  API and OAuth tests
	*.spec.ts             Web UI tests
playwright.config.ts    Playwright configuration and reporters
reporting-labs.config.ts Reporting Labs configuration
tsconfig.json           TypeScript compiler configuration
```

## Adding Tests

1. Add a web test under `tests/` or an API test under `tests/api/`.
2. Reuse or extend a page object in `src/pages/` for UI behavior.
3. Reuse the shared fixtures in `src/fixtures/` where appropriate.
4. Keep environment-specific URLs and credentials in `config/.env.*`, not in test files.
5. Run the focused test first, then run the full suite before opening a pull request.

Example:

```bash
npx playwright test tests/api/user.api.spec.ts
npx playwright test
```

## CI and Troubleshooting

For CI, set `CI=true` and provide the required environment variables securely through the CI provider. CI runs retry failed tests twice and fails if a committed test contains `test.only`.

If tests fail before execution:

```bash
npm install
npx playwright install chromium
```

If tests target the wrong environment, verify `ENV` and confirm the matching `config/.env.<environment>` file exists. If a report is stale, remove the generated report directory and run the tests again.

## Useful References

- [Playwright documentation](https://playwright.dev/docs/intro)
- [Playwright API testing](https://playwright.dev/docs/api-testing)
- [Playwright HTML reporter](https://playwright.dev/docs/test-reporters#html-reporter)
- [Allure Playwright](https://github.com/allure-framework/allure-js)
- [Reporting Labs](https://github.com/naveenautomationlabs/reporting-labs)
