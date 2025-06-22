#!/bin/bash

# Fetch all tags from remote to ensure local is up to date
git fetch --tags

# Get the latest tag (assumes tags are semantic versions like v1.6, v1.6.1, etc.)
latest_tag=$(git describe --tags --abbrev=0 2>/dev/null)

if [ -z "$latest_tag" ]; then
  echo "No tags found. Starting with v0.0.0"
  latest_tag="v0.0.0"
fi

echo "Latest tag is $latest_tag"

# Extract numeric parts from latest tag, assuming format vMAJOR.MINOR.PATCH
version_numbers=${latest_tag#v}  # remove leading 'v'
IFS='.' read -r major minor patch <<< "$version_numbers"

# Prompt user for new version, prefilled with latest tag for convenience
read -p "Enter the new version tag (e.g., v1.6.1) [default: $latest_tag]: " version
version=${version:-$latest_tag}

# Ask for commit message
read -p "Enter commit message: " message

# Add and commit changes
git add .
git commit -m "$message"

# Create annotated tag with message
git tag -a "$version" -m "Release $version"

# Push commits and tags to remote
git push origin main
git push --tags

# Create GitHub release using GitHub CLI (gh)
if command -v gh >/dev/null 2>&1; then
  echo "Creating GitHub release for $version"
  gh release create "$version" --title "Release $version" --notes "Automated release $version"
else
  echo "GitHub CLI (gh) not found, skipping release creation on GitHub."
  echo "Install it from https://cli.github.com/ and run 'gh auth login' to enable this feature."
fi

echo "✅ Released $version and pushed to GitHub."
