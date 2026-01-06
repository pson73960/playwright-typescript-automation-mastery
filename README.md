# Playwright TypeScript Automation Mastery

This is an Enterprise-grade Automation Framework built with Playwright and TypeScript, designed for high scalability, maintainability, and stability.

## 🚀 Key Features
- **Page Object Model (POM)**: Enhanced maintainability by separating UI elements from test logic.
- **API Controller Pattern**: Fast test data preparation and authentication bypass using API requests.
- **Custom Fixtures**: Simplified test setup with automated dependency injection for Pages and Controllers.
- **CI/CD Integration**: Fully automated testing pipeline using **GitHub Actions**.
- **Environment Management**: Dynamic configuration for multiple environments (QA, UAT).
- **Advanced Debugging**: Automatic Trace, Video, and Screenshot collection on test failures.

## 📁 Project Structure
- `.github/workflows/`: CI/CD pipeline definitions.
- `controller/`: API logic and request handling.
- `data/`: Test data management (JSON/CSV).
- `fixtures/`: Custom Playwright fixtures for UI and API layers.
- `models/`: TypeScript interfaces and data structures.
- `pages/`: Page Object classes (Locators and Actions).
- `tests/`: Automated test suites.
- `utils/`: Helper functions and environment configurations.

## 🛠️ Tech Stack
- **Language**: TypeScript
- **Tool**: Playwright Test
- **CI/CD**: GitHub Actions
- **Reporting**: HTML Report & Trace Viewer

## 🚦 How to Run
1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install`
3. Run tests: `npx playwright test`
4. View Report: `npx playwright show-report`

## 📊 CI/CD & Reporting
Each test run on GitHub Actions generates a detailed HTML Report. In case of failure, a **Playwright Trace** file is provided as an artifact for step-by-step debugging.
