#!/usr/bin/env bash
set -e

export PATH="$HOME/.rbenv/bin:$PATH"

RUBY_VERSION="3.3.11"

info()    { echo "[info]  $*"; }
success() { echo "[ok]    $*"; }
warn()    { echo "[warn]  $*"; }

# ---------------------------------------------------------------------------
# Homebrew
# ---------------------------------------------------------------------------
if command -v brew &>/dev/null; then
  success "Homebrew already installed"
else
  info "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Apple Silicon: add brew to PATH for the rest of this script
  [[ -f /opt/homebrew/bin/brew ]] && eval "$(/opt/homebrew/bin/brew shellenv)"
  success "Homebrew installed"
fi

# ---------------------------------------------------------------------------
# rbenv
# ---------------------------------------------------------------------------
if command -v rbenv &>/dev/null; then
  success "rbenv already installed"
else
  info "Installing rbenv..."
  brew install rbenv ruby-build
  eval "$(rbenv init - bash)"

  SHELL_RC="$HOME/.zshrc"
  [[ "$SHELL" == */bash ]] && SHELL_RC="$HOME/.bashrc"

  if ! grep -q 'rbenv init' "$SHELL_RC" 2>/dev/null; then
    echo 'eval "$(rbenv init - zsh)"' >> "$SHELL_RC"
    warn "Added rbenv init to $SHELL_RC — open a new terminal after setup completes"
  fi
  success "rbenv installed"
fi

# ---------------------------------------------------------------------------
# Ruby
# ---------------------------------------------------------------------------
eval "$(rbenv init - bash)" 2>/dev/null || true

if rbenv versions --bare | grep -qx "$RUBY_VERSION"; then
  success "Ruby $RUBY_VERSION already installed"
else
  info "Installing Ruby $RUBY_VERSION (this takes a few minutes)..."
  rbenv install "$RUBY_VERSION"
  success "Ruby $RUBY_VERSION installed"
fi

rbenv local "$RUBY_VERSION"
info "Ruby version set to $(ruby --version)"

# ---------------------------------------------------------------------------
# Bundler
# ---------------------------------------------------------------------------
if gem list bundler -i &>/dev/null; then
  success "Bundler already installed"
else
  info "Installing Bundler..."
  gem install bundler
  rbenv rehash
  success "Bundler installed"
fi

# ---------------------------------------------------------------------------
# Project dependencies
# ---------------------------------------------------------------------------
cd "$(dirname "$0")/.."
info "Running bundle install..."
bundle install
success "Dependencies installed"

echo ""
echo "Setup complete. Run the site locally with:"
echo "  bash build/serve.sh"
