---
title: Clean Coding
tags: [Software Development, Clean Code]
style: fill
color: info
description: These four “clean code” tips will dramatically improve your engineering team’s productivity!
---

Source: [Jonathan Fulton](https://engineering.videoblocks.com/these-four-clean-code-tips-will-dramatically-improve-your-engineering-teams-productivity-b5bd121dd150)

A few weeks ago, while working at University of Maryland, we had a major code quality problem: redunant logic in most files, tons of duplication, no tests, no modularity (no functions or classes) and more. Writing new features and even minor bug fixes required a couple of caffeinated hours at best and packs of cigarettes were consumed far too often. Moreover, I was tasked with reconfiguring the code and integrating different scripts into one **<sighs>**.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*J2mKSLBEp_jUbMtOWXTTjQ.png)


Today, I can say otherwise. Having put my lungs at risk, I can say with a sane mind that the overall quality of our codebases is significantly better thanks in large part to a deliberate effort to improve code quality and using version control and pre-commit hooks for keeping a standardized code format. Implementing such practices appropriately will easily double productivity in the long run (at a bare minimum) allowing quicker development cycles and a better peace of mind.

The following four ideas provided at least 95% of the gains in productivity (and personal happiness) in my experience:

1. **“If it isn’t tested, it’s broken”**
    Write lots of tests, especially unit tests, or you’ll regret it. While approving merge requests, I could've spent a lot less time manually testing by setting up automated testing frameworks which would have easily given me a month of free time. Also, makes automating tasks easier as I could set up CI/CD pipelines for auto-merging.
2. **Choose meaningful names**
    Use short and precise names for variables, classes, and functions because who knows what that function or class object was created for? Also, use `docstrings` for better understanding and knowledge transfer so that other engineers/developers can understand and adapt the code better to suit their needs and requirements.
3. **Classes and functions should be small and obey the Single Responsibility Principle (SRP)**
    Functions should be no more than 4 lines and classes no more than 100 lines. Yep, you read that correctly. They should also do one and only one thing. While integrating various scripts, it became apparent to me that I would like one single thing to fail than having multiple sources of failure. Having reduced each function to its intended purpose, it became easier to integrate features.
4. **Functions should have no side effects**
    Side effects (e.g., modifying an input argument, mismatching the datatype of the intended input variables) are evil. Make sure **not** to have them in your code (or atleast try to make sure!). Specify this explicitly in the function contracts whereever possible (e.g., pass in native types or objects that have no setters). Also, make use of logs and catch errors and exceptions to get a better understanding of the underlying principles of failures/errors.

In addition to the four ideas mentioned above, I also prefer the habit of adding logging functionalities for better tracking the manner in which the code was executed allowing you to debug quicker than `print` statements. But that doesn't mean logging everything down to the tiniest detail possible! There are always ways to setup debugging, information and critical levels of logs.
