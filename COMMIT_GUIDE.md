# Commit Message Guide

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

## Format

```
type: description
```

## Types

| Type       | Description                                               | Example                                   |
| ---------- | --------------------------------------------------------- | ----------------------------------------- |
| `feat`     | A new feature                                             | `feat: add user authentication`           |
| `fix`      | A bug fix                                                 | `fix: resolve login button issue`         |
| `docs`     | Documentation changes                                     | `docs: update README with setup guide`    |
| `style`    | Code style changes (formatting, missing semicolons, etc.) | `style: format code with prettier`        |
| `refactor` | Code refactoring                                          | `refactor: extract user validation logic` |
| `perf`     | Performance improvements                                  | `perf: optimize database queries`         |
| `test`     | Adding or updating tests                                  | `test: add unit tests for auth service`   |
| `chore`    | Maintenance tasks, dependencies, etc.                     | `chore: update dependencies`              |
| `ci`       | CI/CD changes                                             | `ci: add GitHub Actions workflow`         |
| `build`    | Build system changes                                      | `build: update webpack configuration`     |
| `revert`   | Revert previous commit                                    | `revert: remove experimental feature`     |

## Rules

- **Type**: Must be lowercase and one of the allowed types
- **Description**: Must be lowercase, concise, and descriptive
- **No period**: Don't end the description with a period
- **Length**: Keep the header under 72 characters

## Examples

### ✅ Correct

```
feat: add user authentication system
fix: resolve navigation menu overflow
docs: update API documentation
style: format code with prettier
refactor: extract reusable components
perf: optimize image loading
test: add unit tests for utils
chore: update dependencies
ci: add automated testing
build: configure production build
revert: remove experimental feature
```

### ❌ Incorrect

```
test
add feature
FIX: bug
feat: Add new feature.
docs: Update documentation with very long description that exceeds the character limit
```

## Quick Commands

```bash
# Using conventional commit format
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update documentation"

# Using commitizen (interactive)
npm run commit
```

## Tools

This project uses the following tools to enforce commit standards:

- **Husky**: Git hooks for pre-commit and commit-msg
- **lint-staged**: Run linters on staged files
- **commitlint**: Validate commit message format
- **commitizen**: Interactive commit message creation
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Pre-commit Hooks

Before each commit, the following checks are automatically run:

1. **lint-staged**: Formats and lints staged files
2. **commit-msg**: Validates commit message format

## Troubleshooting

If your commit is rejected:

1. Check the error message for the specific issue
2. Follow the format: `type: description`
3. Use one of the allowed types
4. Keep the message concise and descriptive
5. Don't end with a period

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
