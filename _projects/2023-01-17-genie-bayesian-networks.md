---
name: Bayesian Belief Networks using GeNIe
tools: [GeNIe]
image:
description: An implementation of [Probabilistic Model of Belief in Safety Cases](https://www.diva-portal.org/smash/get/diva2:1499879/FULLTEXT01.pdf)
---

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Bayesian Belief Networks using GeNIe</h3>

</div>

# Table of contents

* TOC
{:toc}

# About the project


# Safety-case fragment in GSN format which is used for evaluation

<img width="638" alt="Screenshot 2023-01-17 at 10 49 46 PM" src="https://user-images.githubusercontent.com/24211929/212967903-cd1af9b5-5421-43b7-b1ff-9ec20ec0e26c.png">


# The Bayesian Network for the GSN argument from above

<img width="638" alt="Screenshot 2023-01-17 at 10 50 13 PM" src="https://user-images.githubusercontent.com/24211929/212967878-340e9178-69ee-42b7-ac90-6e05a09b31ca.png">


# Mapping GSN nodes to concepts based on formulas of $L$
|GSN node|Concept based on $L$|
|:--------:|:--------------------:|
|Goal|Claim|
|Strategy|Inference rule|
|Solution|Evidence|
|Assumption|axiom|
|Justification|axiom|
|Context|Claim|

# Encoding inequality as a Bayesian Network
|Concept based on $L$|Random Variable|State Space|
|:--------:|:--------------------:|:-----------:|
|Evidence $e$|$X_e$|$sat$,$notsat$|
|axiom $\alpha$|$X_\alpha$|$sat$,$notsat$|
|Inference rule $\psi$|$X_\psi$|$sound$,$notsound$|
|premises $p_1,p_2,...$|$X_{p_1},X_{p_2},...$|$sat$,$notsat$|
|conclusion $q$|$X_q$|$sat$,$notsat$|

#  GSN structure and the corresponding Bayesian Network
> Nodes with dashed outline represent implicit inference rules.

<img width="1000" alt="Screenshot 2023-01-18 at 2 01 23 AM" src="https://user-images.githubusercontent.com/24211929/213006359-fcb0da34-fba7-45ae-879c-ab7f5e4b08c2.png">


