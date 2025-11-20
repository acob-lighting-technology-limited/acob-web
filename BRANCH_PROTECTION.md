# Branch Protection Setup Guide

## ✅ Local Protection (Already Configured)

A pre-push hook has been set up to prevent direct pushes to the `main` branch from your local machine. This will block any attempts to push directly to main.

## 🔒 GitHub Branch Protection Rules (Recommended)

For complete protection, set up branch protection rules on GitHub:

### Steps:

1. **Go to your repository on GitHub:**
   - Navigate to: https://github.com/acob-lighting-technology-limited/ACOB-Website

2. **Access Settings:**
   - Click on **Settings** tab (top navigation)
   - Click on **Branches** in the left sidebar

3. **Add Branch Protection Rule:**
   - Click **Add branch protection rule** or **Add rule**
   - In the **Branch name pattern** field, enter: `main`

4. **Configure Protection Settings:**
   - ✅ **Require a pull request before merging**
     - Check "Require approvals" (set to 1 or more)
     - Check "Dismiss stale pull request approvals when new commits are pushed"
   - ✅ **Require status checks to pass before merging**
     - Check "Require branches to be up to date before merging"
     - Add required status checks (e.g., build, lint, test)
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings**
     - Check "Do not allow bypassing the above settings" (if you have admin access)
   - ✅ **Restrict pushes that create files larger than 100 MB**
   - ✅ **Include administrators** (recommended - protects even admins)

5. **Save the rule:**
   - Click **Create** or **Save changes**

### Recommended Workflow:

1. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:

   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. Push to your feature branch:

   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub:
   - Go to your repository on GitHub
   - Click "Compare & pull request"
   - Add description and reviewers
   - Wait for approval and CI checks to pass
   - Merge via Pull Request

### Benefits:

- ✅ Prevents accidental direct pushes to main
- ✅ Requires code review before merging
- ✅ Ensures CI/CD checks pass before merging
- ✅ Maintains a clean git history
- ✅ Protects your live website from breaking changes
