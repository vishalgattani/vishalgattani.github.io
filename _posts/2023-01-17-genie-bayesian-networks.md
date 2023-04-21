---
title: Bayesian Belief Networks using GeNIe
tags: [Assurance Case, Bayesian Networks, Probability]
style:
color:
description: An implementation of "Probabilistic Model of Belief in Safety Cases".
---

Source: [A Probabilistic Model of Belief in Safety Cases](https://www.diva-portal.org/smash/get/diva2:1499879/FULLTEXT01.pdf)

<!-- ---
name: Bayesian Belief Networks using GeNIe
tools: [GeNIe]
image: https://user-images.githubusercontent.com/24211929/212967878-340e9178-69ee-42b7-ac90-6e05a09b31ca.png
description: An implementation of "Probabilistic Model of Belief in Safety Cases".
--- -->

<!-- PROJECT LOGO -->
<!-- <br />
<div align="center">

<h3 align="center">Bayesian Belief Networks using GeNIe</h3>

</div>

# Table of contents

* TOC
{:toc} -->

# About the concept

An implementation of [Probabilistic Model of Belief in Safety Cases](https://www.diva-portal.org/smash/get/diva2:1499879/FULLTEXT01.pdf) to compute a lower limit or worst case belief in the top level claim of a safety case.

#  GSN structure and the corresponding Bayesian Network
> Nodes with dashed outline represent implicit inference rules.

<img width="1000" alt="Screenshot 2023-01-18 at 2 01 23 AM" src="https://user-images.githubusercontent.com/24211929/213006359-fcb0da34-fba7-45ae-879c-ab7f5e4b08c2.png">

1. Mapping the types of elements of a concrete safety-case notation to the concepts of claim, argument, inference rule, evidence, and axioms as defined in Section 4 of the [paper](https://www.diva-portal.org/smash/get/diva2:1499879/FULLTEXT01.pdf).

## Mapping GSN nodes to concepts based on formulas of $L$

|GSN node|Concept based on $L$|
|:--------:|:--------------------:|
|Goal|Claim|
|Strategy|Inference rule|
|Solution|Evidence|
|Assumption|axiom|
|Justification|axiom|
|Context|Claim|


2. An encoding of the probabilistic model into a Bayesian Network.

## Encoding inequality as a Bayesian Network

|Concept based on $L$|Random Variable|State Space|
|:--------:|:--------------------:|:-----------:|
|Evidence $e$|$X_e$|$sat$,$notsat$|
|axiom $\alpha$|$X_\alpha$|$sat$,$notsat$|
|Inference rule $\psi$|$X_\psi$|$sound$,$notsound$|
|premises $p_1,p_2,...$|$X_{p_1},X_{p_2},...$|$sat$,$notsat$|
|conclusion $q$|$X_q$|$sat$,$notsat$|

3. An assignment of values to the conditional probability tables (CPTs) that are associated with the random variables within the Bayesian Network.

## Type I CPT values
The first type are the values for the CPTs of random variables that represent a conclusion of an argument. The CPTs of such encode the probability that it is `sat` or `notSat` , for all combinations of states of parent variables. Because the paper is only interested in the case when conclusion is `sat` , for all premises, evidences and axioms to be `sat`. The value $P(X_q = sat \mid X_q = sat ,X_{p1} = sat ,\dots,X_{pn} = sat ,X_{\psi} = sound ,X_\alpha = sat )$ is set to 1. For all other combinations of states of parent variables the probability is set to 0.

## Type II CPT values
The second type are the values for the probability that an explicitly declared inference rule, is sound or a logical consequence of the asserted axioms.

## Type III CPT values
The third type are the values for the belief in the implicit inference rules. Again, in the general case, such values must be set manually.

# Safety-case fragment in GSN format which is used for evaluation

<img width="638" alt="Screenshot 2023-01-17 at 10 49 46 PM" src="https://user-images.githubusercontent.com/24211929/212967903-cd1af9b5-5421-43b7-b1ff-9ec20ec0e26c.png">


From above figure, if it were to be a complete safety case, the CPT values for `ClaimC2-ClaimC5` would be of Type I. However, because the figure contains just a fragment, it is manually set these values to 0.99.

# The Bayesian Network for the GSN argument from above

<img width="638" alt="Screenshot 2023-01-17 at 10 50 13 PM" src="https://user-images.githubusercontent.com/24211929/212967878-340e9178-69ee-42b7-ac90-6e05a09b31ca.png">


# Replication

- The CPT values for random variables `ClaimG1-ClaimG5` are of Type I.
- The CPT values for variables `InferenceRule1-InferenceRule2` are of Type II.
- The CPT values for variables `InferenceRule3-InferenceRule5` are of Type III and must be set manually.
  - Since random variables `InferenceRule3−InferenceRule5` represent the effectiveness of increasingly rigorous verification techniques, namely review, testing, and formal verification, the beliefs are set to 0.9, 0.95, and 0.99, respectively.

 Given these values, and by using the GeNIe tool as shown below, the computed lower limit of the belief in the top claim is 0.81.


<!-- <img width="1552" alt="Screenshot 2023-01-18 at 2 22 39 AM" src="https://user-images.githubusercontent.com/24211929/214272286-6087487c-4fd3-4a5e-85ca-08a688a9a07d.png"> -->


<img width="638" alt="Screenshot 2023-01-18 at 2 22 39 AM" src="https://user-images.githubusercontent.com/24211929/214272286-6087487c-4fd3-4a5e-85ca-08a688a9a07d.png">