---
title: How to Build a Complete Python Package in minutes!
tags: [Python]
style: fill
color: success
description: Do you want to know how to build a complete Python package? Well, look no further!
---

# Introduction

- Python packaging is the most common way to share code/libraries/applications. It allows packaging of the modules, so that they can later be published and deployed by other users, either by sharing binary files, source code or by using a package manager to fetch them from online (public/private) repositories.
- The recommended way to package your code is by using the built-in python library _setuptools_ which has a lot and powerful functionalities.


# Motivation

- Easier management of release versioning
- Shipping and deployment becomes pretty simple
- Automatic dependency management
- Increase your code’s accessibility
- Cloud computing
- Containerizing your application

## `setuptools`

- _setuptools_ is a (now standard) python library that facilitates packaging python projects by enhancing the _distutils_ library.
- Important keywords/parameters of _setuptools_ to be aware of:
  - wheel (.whl): A pre-built (zip) binary file, which is ready to be installed, that contains all the necessary information (code itself and metadata) for python package manager to install the package. To create one you should run `python setup.py bdist_wheel` within the shell. bdist stands for binary distribution.
  - sdist (.tar.gz) : The source code distribution equivalent to wheel. A tar file (zip) that contains the source code together with the `setup.py` file, so the user can re-built it. To create a source distribution run `python setup.py sdist`
- The above two commands can be combined into one, if both distributions are desired. The output will be stored within the _dist_ folder that setuptools will create in the same level with `setup.py` resides.
- The build folder: Contains all the source code / modules that will be distributed.
- egg-info: A directory placed adjacent to the project's code and resources, that directly contains the project's metadata. Replaced by wheels. (directly from Wikipedia)
  - Python eggs are a way of bundling additional information with a Python project, that allows the project's dependencies to be checked and
    satisfied at runtime, as well as allowing projects to provide [plugins](<https://en.wikipedia.org/wiki/Plug-in_(computing)>) for other projects. (quoting wikipedia)

## `setup.py`

- Talk about the basic parameters (the ones already in our example `setup.py` file), brief explanation on what each one is responsible for.
- Explain in a nutshell how to customize the parameters it needs for `setup.py` to work, mostly package dir and packages that allows setuptools to automatically find all the packages in our project structure.

If extra data is required, customize the following:

```python
from setuptools import find_packages, setup
with open("app/README.md", "r") as f:
    long_description = f.read()
with open('requirements.txt') as f:
    required = f.read().splitlines()
setup(
    name="<package_name>",
    version="0.0.1",
    description="<package_description>",
    package_dir={"": "app"},
    packages=find_packages(where="app"),
    include_package_data=True,
    package_data={"": ["*.txt", "*.png","*.sh"]}, # or any other filetype
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="",
    author="<your_name>",
    author_email="<your_email>",
    license="MIT",
    classifiers=[
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: <python_version>",
        "Operating System :: OS Independent",
    ],
    install_requires=required,
    extras_require={
        "dev": ["pytest>=7.0", "twine>=4.0.2"],
    },
    python_requires=">=<python_version>",
)
```
- `__init__.py` needs to be present in every directory/folder in order for it to be seen as a package directory.
- An alternative to adding the parameters in `setup.py` (python file) you can screate a setup.cfg (configuration file) as well. But that’s outside the scope of this video.

## Building and installing a package (`sdist`, `wheel`)

- Run `setup.py` using `python setup.py bdist_wheel sdist` command which creates both source code files and binary (`.whl`) file.
- Then install package locally by running `pip install <package_name>-0.0.x-py3-none-any.whl`. Alternatively, you can also run `pip install .` under the directory where [setup.py] lives and will install your package directly, but that doesn’t utilize the _dist_ folder which contains all the files needed for publishing in the PyPI repository. (up to you).
- Optionally, explain how to update _.gitignore_ to ignore _build, dist and .egg-info_ files.
> Note: The current `setup.py` file is configured to also install the tests within the python environment. That is not the way it should normally happen, it happens only for the purposes of this demo. We can always change that for the video if you think it should happen otherwise.

# Retrospective

Things to keep in mind before diving into code packaging:

1. Does it make sense when you package your code? (Is your code easily re-usable/abstracted enough and ‘plug and play’ after deployment?)
2. Are you packaging your code for own use (for example in different environment), or to share it easier with other developers? (Documenting it, creating a helper web-page might be a good idea, or even necessary in some cases)
3. If the application requires extra data, should those data be incorporated in the module or linked externally (depending on size)?
4. Are the code modules decoupled enough for the end user to utilize parts of the package if needed?
5. Is the architecture good enough for further development and do the modules/submodules semantically make sense to be named/placed the way they are?
6.  Instead of using `setup.py` file (code) you can atlernatively use setup.cfg which is a configuration file instead.
7.  Avoid using `distutils` package. Instead use `setuptools`, which is an enhancement of the former.
8.  It is recommended to publish your code under a license. By not using any license, when packaging your code you are not allowing anyone to use your code?

# References

1. [ArjanCodes](https://github.com/ArjanCodes/2023-package)