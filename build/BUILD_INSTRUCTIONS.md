# Build Instructions

Local setup for [vishalgattani.github.io](https://vishalgattani.github.io) — a Jekyll static site.

---

## Prerequisites

### 1. Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. rbenv (Ruby version manager)

```bash
brew install rbenv ruby-build
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Ruby 3.3.11

The project pins Ruby to `3.3.11` via `.ruby-version`.

```bash
rbenv install 3.3.11
rbenv local 3.3.11
ruby --version   # should print ruby 3.3.11
```

### 4. Bundler

```bash
gem install bundler
```

---

## Install Dependencies

From the repo root:

```bash
bundle install
```

This installs Jekyll and all plugins declared in `Gemfile`.

---

## Run Locally

```bash
bash build/serve.sh
```

Opens `http://localhost:4000` automatically with live-reload enabled.
Changes to any source file rebuild the site in place — no restart needed.

To stop the server: `Ctrl+C`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `ruby: command not found` | Run `rbenv install 3.1.0 && rbenv local 3.1.0` |
| `bundle: command not found` | Run `gem install bundler` |
| Port 4000 already in use | `lsof -ti:4000 \| xargs kill` then retry |
| `cannot load such file -- webrick` | `bundle add webrick` (Ruby 3+ removed it from stdlib) |
