#!/bin/bash

# Ask for the version
read -p "Enter the new version tag (e.g., v1.6): " version

# Ask for the commit message
read -p "Enter commit message: " message

# Add and commit changes
git add .
git commit -m "$message"

# Create tag
git tag "$version"

# Push changes and tag
git push origin main
git push origin "$version"

echo "✅ Released $version and pushed to GitHub."
