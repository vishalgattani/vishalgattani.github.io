---
title: Committing to Excellence - How Pre-Commit Hooks Keep Your Codebase Prettier and Your Commits Tidier
tags: [Software Development, Clean Code, Python]
style: fill
color: info
description: Are your code commits in need of a makeover? Dive into the captivating world of pre-commit hooks in this =blog post. Discover how these magical tools can transform your codebase into a work of art, ensuring pristine formatting and enchanting commit messages.
---

Pre-commit hooks in Git are like your code's personal stylist, working their magic just before it hits the stage (the repository). They're the backstage crew making sure your commits look sharp, sound good, and bring their A-game. These hooks let you run scripts and commands to ensure your code meets the highest quality standards. It's like having a mini-festival in your local environment, with tasks that include code formatting for the perfect outfit, linting to catch style blunders, and even testing to make sure your code is ready to rock the show without any surprises!

To set up pre-commit from scratch, you can follow these steps:

1. Create a new project directory for your code, and navigate to it using the command line. The `.pre-commit-config.yaml` file is also located in the root directory, and contains the configuration for the pre-commit hooks that will be run on the code before committing changes to the repository.
2. Create a virtual environment using `python` by running the following command `python3 -m venv .venv` where `.venv` is the name of oyurt virtual environment.
3. Activate it by running the command `source .venv/bin/activate`
4. Install `pre-commit` using pip by running `pip install pre-commit`.
5. Install `pytest` using pip by running `pip install pytest`.
6. Initialize pre-commit in your project directory by running `pre-commit init`.
7. Create a `.pre-commit-config.yaml` file in your project directory with the hooks you want to run. This pre-commit configuration specifies a set of hooks to be executed before committing changes to the repository. A sample `.yaml` is shown below.

```yaml
repos:
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v2.3.0
    hooks:
    -   id: check-yaml
    -   id: end-of-file-fixer
    -   id: trailing-whitespace
    -   id: check-merge-conflict
    -   id: mixed-line-ending
        args: [--fix=lf]

-   repo: https://github.com/PyCQA/isort
    rev: 5.12.0
    hooks:
    -   id: isort
        args: ["--profile", "black", "--filter-files"]
-   repo: https://github.com/psf/black
    rev: 23.9.1
    hooks:
    -   id: black
# optional (if you have any test scripts)
-   repo: local
    hooks:
  -     id: run_tests
        language: script
        name: Run tests
        entry: ./run_test.sh
        stage: [commit]
```

Specifically, it does the following:

- Configures the Black formatter and the Black Jupyter extension to format Python code in a standardized way.
- Configures the Flake8 linter to check for style violations and errors in the code.
- Configures the trailing-whitespace hook to remove any trailing whitespace in the files being committed.
- Configures a custom `run_tests` hook to run a script that executes the test suite for the project.

"*repos*" is a keyword in the pre-commit configuration file that specifies a list of Git repositories containing hooks that should be installed and used by the pre-commit framework. Each repository in the list is specified as a YAML dictionary with the following keys:
- repo: The URL of the Git repository containing the hooks.
- rev: The revision (tag, branch or commit hash) to checkout from the repository.
- hooks: A list of hooks to install and use from the repository.

7. Install the hooks in your virtual environment by running pre-commit install.

After following these steps, pre-commit will run automatically before every commit to ensure that the code conforms to the rules defined by the hooks in the `.pre-commit-config.yaml` file.

As we wrap up our pre-commit hook adventure, it's time to embrace the groovier, cleaner, and more polished Git experience they bring. With these magical tools, your code commits will be the rockstars of your repository – perfectly styled, in tune, and ready to hit the stage. Say goodbye to last-minute errors and code mishaps. Let the power of pre-commit hooks take your coding journey to a whole new level, where quality and style are non-negotiable. So, start jamming with these hooks and turn your code commits into the showstoppers they were born to be. Keep coding, keep committing, and always keep it funky!