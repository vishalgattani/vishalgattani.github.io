#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
bundle exec jekyll serve --livereload --open-url
