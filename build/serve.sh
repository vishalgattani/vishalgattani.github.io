#!/usr/bin/env bash
set -e

# Init rbenv so the pinned Ruby version is used instead of the system Ruby
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init - bash)"

cd "$(dirname "$0")/.."
bundle exec jekyll serve --livereload --open-url
