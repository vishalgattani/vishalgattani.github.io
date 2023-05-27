---
title: Bayesian Belief Networks using GeNIe
tags: [Assurance Case, Bayesian Belief Networks, Probability]
style: fill
color: primary
description: How can Bayesian Belief Networks help in answering questions about the presence of a cause given the presence of an effect?
---

<!-- Source: [A Probabilistic Model of Belief in Safety Cases](https://www.diva-portal.org/smash/get/diva2:1499879/FULLTEXT01.pdf) -->

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

<!-- # About the concept

An implementation of [Probabilistic Model of Belief in Safety Cases](https://www.diva-portal.org/smash/get/diva2:1499879/FULLTEXT01.pdf) to compute a lower limit or worst case belief in the top level claim of a safety case. -->

# Bayesian Belief Networks (BBNs)

BBNs are a graphical modeling approach that models the conditional probabilistic relationships of certain independent variables. From [Pearl](https://www.sciencedirect.com/book/9780080514895/probabilistic-reasoning-in-intelligent-systems), in a BBN model, nodes represent variables or events that may affect or be affected by other variables, while arrows between nodes represent the direct dependencies or causal relationships between the variables. The direction of the arrow indicates the direction of the causal impact or influence. This network structure allows us to represent and reason about the joint probability distribution over all the variables in the network, given the available evidence or observations.

To illustrate the concept of a BBN, let us consider a scenario where we need to model the dependencies between three variables: the state of a sprinkler (on or off), the presence or absence of rain, and whether the grass is wet or not. In this scenario, there are two possible causes for wet grass: an active sprinkler or rain. Moreover, rain has a direct effect on the use of the sprinkler, as the sprinkler is typically not used when it is raining. This scenario can be effectively modeled using a BBN within GeNIe, where each variable has two possible values. The network diagram shown below captures the probabilistic dependencies between the three variables and provides a visual representation of the states of the random variables and their relationships between them.

<img width="477" alt="wetgrass-network" src="https://user-images.githubusercontent.com/24211929/234073914-9fd07fdf-9c78-4a12-a9bf-7641c90ccd78.png">

**Conditional Probability table for Wet Grass Node**

| Sprinkler | Rain    | Wet Grass | Wet Grass |
|-----------|-------|----------------| ---------------|
|  |   | Yes                           | No   |
| On        | True  | 0.99                          | 0.01 |
| On        | False | 0.9                           | 0.1  |
| Off       | True  | 0.8                           | 0.2  |
| off       | False | 0.0                           | 1.0  |

**Conditional Probability table for Sprinkler Node**

| Rain    | Sprinkler | Sprinkler |
|-------|-----------|--------------------|
|   | On                            | Off  |
| True  | 0.4                           | 0.6  |
| False | 0.01                          | 0.99 |

**Conditional Probability table for Rain Node**

|    | Rain |
|-------|------|
| True  | 0.8  |
| False | 0.2  |


By utilizing the conditional probability formula, the BBN model can be used to answer questions about the presence of a cause given the presence of an effect, a concept commonly referred to as inverse probability. For example, we may ask "*Given that the grass is wet, what is the probability that it is raining?*". The BBN allows us to calculate this probability by using the conditional probabilities associated with each node in the network as shown below. This type of analysis enables us to make inferences about the likelihood of different causal factors based on observed effects and can be a powerful tool for decision-making and problem-solving in a wide range of contexts.

<img width="477" alt="wetgrass-network-wettrue" src="https://user-images.githubusercontent.com/24211929/234073912-a46b1acf-8257-4e61-9cbf-1f6249f7dbf5.png">
<img width="477" alt="wetgrass-network-wetfalse" src="https://user-images.githubusercontent.com/24211929/234073910-a8e1cf8e-61f1-40ea-b0df-e11e6a1f92d2.png">


Similarly, if we have information on either the sprinkler or the occurrence of rain, then the likelihood of different causal factors based on observed effects are shown

<img width="477" alt="wetgrass-network-sprinklertrue" src="https://user-images.githubusercontent.com/24211929/234073905-99e68d04-9abe-4a19-89ee-f85f0db3b186.png">
<img width="477" alt="wetgrass-network-sprinklerfalse" src="https://user-images.githubusercontent.com/24211929/234073904-a8a28d5d-b2e7-4894-8acd-a889ba4849be.png">

<img width="477" alt="wetgrass-network-raintrue" src="https://user-images.githubusercontent.com/24211929/234073909-54b68638-4494-4b88-909f-6ccfc8cb43fe.png">
<img width="477" alt="wetgrass-network-rainfalse" src="https://user-images.githubusercontent.com/24211929/234073908-a0360fc6-4877-46f0-b106-d51e7330aaa0.png">



<!--

#  GSN structure and the corresponding Bayesian Belief Networks
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


2. An encoding of the probabilistic model into a Bayesian Belief Networks.

## Encoding inequality as a Bayesian Belief Networks

|Concept based on $L$|Random Variable|State Space|
|:--------:|:--------------------:|:-----------:|
|Evidence $e$|$X_e$|$sat$,$notsat$|
|axiom $\alpha$|$X_\alpha$|$sat$,$notsat$|
|Inference rule $\psi$|$X_\psi$|$sound$,$notsound$|
|premises $p_1,p_2,...$|$X_{p_1},X_{p_2},...$|$sat$,$notsat$|
|conclusion $q$|$X_q$|$sat$,$notsat$|

3. An assignment of values to the conditional probability tables (CPTs) that are associated with the random variables within the Bayesian Belief Networks. According to the literature:

## Type I CPT values
The first type are the values for the CPTs of random variables that represent a conclusion of an argument. The CPTs of such encode the probability that it is `sat` or `notSat` , for all combinations of states of parent variables. Because the paper is only interested in the case when conclusion is `sat` , for all premises, evidences and axioms to be `sat`.

The value $P(X_q = sat \mid X_q = sat ,X_{p1} = sat ,\dots,X_{pn} = sat ,X_{\psi} = sound ,X_\alpha = sat )$ is set to 1. For all other combinations of states of parent variables the probability is set to 0.

## Type II CPT values
The second type are the values for the probability that an explicitly declared inference rule, is sound or a logical consequence of the asserted axioms.

## Type III CPT values
The third type are the values for the belief in the implicit inference rules. Again, in the general case, such values must be set manually.

# Safety-case fragment in GSN format which is used for evaluation

<img width="638" alt="Screenshot 2023-01-17 at 10 49 46 PM" src="https://user-images.githubusercontent.com/24211929/212967903-cd1af9b5-5421-43b7-b1ff-9ec20ec0e26c.png">

From above figure, if it were to be a complete safety case, the CPT values for `ClaimC2-ClaimC5` would be of Type I. However, because the figure contains just a fragment, it is manually set these values to 0.99 in the literature.

# The Bayesian Belief Networks for the GSN argument from above

<img width="638" alt="Screenshot 2023-01-17 at 10 50 13 PM" src="https://user-images.githubusercontent.com/24211929/212967878-340e9178-69ee-42b7-ac90-6e05a09b31ca.png">

# Replication

- The CPT values for random variables `ClaimG1-ClaimG5` are of Type I.
- The CPT values for variables `InferenceRule1-InferenceRule2` are of Type II.
- The CPT values for variables `InferenceRule3-InferenceRule5` are of Type III and must be set manually.
  - Since random variables `InferenceRule3−InferenceRule5` represent the effectiveness of increasingly rigorous verification techniques, namely review, testing, and formal verification, the beliefs are set to 0.9, 0.95, and 0.99, respectively.

 Given these values, and by using the GeNIe tool as shown below, the computed lower limit of the belief in the top claim is 0.81.


<!-- <img width="1552" alt="Screenshot 2023-01-18 at 2 22 39 AM" src="https://user-images.githubusercontent.com/24211929/214272286-6087487c-4fd3-4a5e-85ca-08a688a9a07d.png"> -->

<!--
<img width="638" alt="Screenshot 2023-01-18 at 2 22 39 AM" src="https://user-images.githubusercontent.com/24211929/214272286-6087487c-4fd3-4a5e-85ca-08a688a9a07d.png"> -->