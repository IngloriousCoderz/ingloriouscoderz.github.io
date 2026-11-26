---
title: Let's Program a Quantum Computer in Python
description: An introduction to quantum computing, starting from the code.
author: Matteo Antony Mistretta
date: 2021-03-11
topic: quantum
original: it
---

_Warning_: we'll be talking about logic circuits, vectors, matrices and quantum physics. For the bravest only!

If you recognize the following diagram as a logic circuit, you're on the right track:

![Half Adder](https://upload.wikimedia.org/wikipedia/commons/f/f4/Figura_HA.jpg)

This article is an attempt to explain the basics of quantum computing in a simple, linear and experimental way, starting from the code rather than from maths or physics: subjects that, however fascinating, are not for everyone, and are perhaps more useful to explain how things work than how to use them. In short, this is a post for engineers more than for scientists.

To try the following code on your own computer you need to install [Qiskit](https://qiskit.org/documentation/install.html), and possibly the [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extension for [Visual Studio Code](https://code.visualstudio.com/).

Special thanks go to [Federico Mattei](https://www.linkedin.com/in/federicomattei/) from [IBM](https://www.ibm.com/) who, with a workshop held for [Powercoders](https://powercoders.org/), got me hooked on the subject:

> 📸 [See the post on Instagram](https://www.instagram.com/p/B-1QUyYon2n/)

and to [Gabriele Agliardi](https://www.linkedin.com/in/gabriele-agliardi-50471047/), also from IBM, who read and validated my articles:

> 📸 [See the post on Instagram](https://www.instagram.com/p/B_vG_WWIOwF/)

OK, let's start. First of all, let's import the libraries we need.

```python
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_bloch_multivector, plot_histogram
import math
```

Then a few handy functions to draw or better format the output. It's not worth trying to understand what they do right now; we'll come back to them later.

```python
def draw(circuit):
    return circuit.draw(output='mpl')


def unitary(circuit):
    backend = Aer.get_backend('unitary_simulator')
    result = execute(circuit, backend).result()
    prettify_matrix(result.get_unitary())


def statevector(circuit):
    backend = Aer.get_backend('statevector_simulator')
    result = execute(circuit, backend).result()
    prettify_vector(result.get_statevector())
    return plot_bloch_multivector(result.get_statevector())


def counts(circuit):
    backend = Aer.get_backend('qasm_simulator')
    result = execute(circuit, backend, shots=100).result()
    counts = result.get_counts()
    print(counts)
    return plot_histogram(counts)


def prettify_matrix(matrix):
    pretty_matrix = ''
    for row in range(len(matrix)):
        pretty_matrix += '|'
        for col in range(len(matrix[row])):
            pretty_matrix += prettify_value(matrix[row][col])
            if col < len(matrix[row]) - 1:
                pretty_matrix += ' '
        pretty_matrix += '|\n'
    print(pretty_matrix)


def prettify_vector(vector):
    pretty_vector = ''
    for row in range(len(vector)):
        pretty_vector += '|' + prettify_value(vector[row]) + '|\n'
    print(pretty_vector)


def prettify_value(value):
    if math.isclose(value.imag, 0, abs_tol=0.01):
        return '{num.real:>-.2f}'.format(num=value)
    elif math.isclose(value.real, 0, abs_tol=0.01):
        return '{num.imag:>-.2f}i'.format(num=value)
    else:
        return '{num.real:>-.2f}+{num.imag:>-.2f}i'.format(num=value)
```

## Logic gates

The simplest computer we can build is a circuit with a single quantum wire and no logic gates.

```python
circuit = QuantumCircuit(1)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_7_0.svg)

Quantum circuits can be represented mathematically as unitary matrices: mathematically, this means that these matrices multiplied by their conjugate transpose give the identity matrix ($A \cdot A^\dagger = I$), but in plain words they describe operations that are always reversible, that is, operations that can also be performed backwards in time, or that let you trace the output back to the initial input. If you want to dig deeper into what that means and why, there's an excellent answer on [StackExchange](https://physics.stackexchange.com/a/270331):

> Quantum gates have to be reversible because quantum mechanics is reversible (and even more specifically it is unitary). It's just an observed fact about the universe. (Even measurement can be modeled as a reversible unitary operation, inconvenient though that may be.)
>
> Actually, classical computers also have to be reversible. We just happen to be able to sidestep the problem by throwing out accumulated garbage information as we go. Throwing out garbage information during quantum computations would also be possible, but because discarded garbage information counts as a measurement and measurement tends to break quantum algorithms... not so viable.

Circuits can run on different backends, simulated or real, and to inspect the corresponding unitary matrix we'll use a dedicated simulator.

```python
backend = Aer.get_backend('unitary_simulator')
result = execute(circuit, backend).result()
result.get_unitary()
```

    array([[1.+0.j, 0.+0.j],
           [0.+0.j, 1.+0.j]])

Since the unitary matrix is hard to read like this, let's use one of the functions defined at the beginning of the article to format it better.

```python
unitary(circuit)
```

    |1.00 0.00|
    |0.00 1.00|

It's the identity matrix! Basically, this circuit doesn't change the initial input at all. In fact, we can use the `I` gate, which corresponds to the identity matrix.

```python
circuit = QuantumCircuit(1)
circuit.i(0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_13_0.svg)

```python
unitary(circuit)
```

    |1.00 0.00|
    |0.00 1.00|

The input is not a bit, that is a scalar that is either 0 or 1, but a qubit: a vector in a three-dimensional space. Let's see what it looks like.

```python
statevector(circuit)
```

    |1.00|
    |0.00|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_16_1.svg)

This is the vector called $|0\rangle$ (_zero ket_) in Dirac notation (aka _bra-ket notation_).

_Fun fact_: if the qubit lives in a three-dimensional world, why does the vector only have two dimensions? For convenience, on the y axis we use the number `i` (or `j`). So, to be precise, a qubit is represented by a two-dimensional vector of complex numbers! Here's an example.

```python
circuit = QuantumCircuit(1)
circuit.initialize([1/math.sqrt(2), 1j/math.sqrt(2)], 0)
statevector(circuit)
```

    |0.71|
    |0.71i|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_18_1.svg)

And here's the unitary matrix.

```python
unitary(circuit)
```

    |0.71 -0.71|
    |0.71i 0.71i|

In practice, none of the algorithms I've seen so far really needs to bother with the third dimension, so we can treat the vector as purely two-dimensional.

Let's look at the first simple logic gate that actually does something: the `X` gate (equivalent to the `NOT` gate in classical circuits).

```python
circuit = QuantumCircuit(1)
circuit.x(0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_23_0.svg)

The associated matrix flips the input vector.

```python
unitary(circuit)
```

    |0.00 1.00|
    |1.00 0.00|

And indeed the resulting vector is flipped. This is the vector called $|1\rangle$ (_one ket_).

```python
statevector(circuit)
```

    |0.00|
    |1.00|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_27_1.svg)

This matrix is unitary too: if we try a double negation, we get the identity matrix again.

```python
circuit = QuantumCircuit(1)
circuit.x(0)
circuit.x(0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_29_0.svg)

```python
unitary(circuit)
```

    |1.00 0.00|
    |0.00 1.00|

```python
statevector(circuit)
```

    |1.00|
    |0.00|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_31_1.svg)

Just as there's an `X` gate, there are also `Y` and `Z` gates. All three rotate the state vector by 180° around their respective axis, and together they make up the Pauli gates. So in this case `NOT` is not just a negation: it's a half turn around an axis. What happens if we rotate $|0\rangle$ around the y axis?

```python
circuit = QuantumCircuit(1)
circuit.y(0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_33_0.svg)

```python
statevector(circuit)
```

    |0.00|
    |1.00i|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_34_1.svg)

The `Y` gate leads to the same result as the `X` gate, just rotating around the y axis! Here's its matrix, for the curious.

```python
unitary(circuit)
```

    |0.00 -1.00i|
    |1.00i 0.00|

As expected, it includes complex numbers, since we're involving the y axis.

```python
circuit = QuantumCircuit(1)
circuit.z(0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_38_0.svg)

```python
statevector(circuit)
```

    |1.00|
    |-0.00|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_39_1.svg)

The `Z` gate rotated the vector onto itself! Not very useful when the vector is already parallel to the z axis. Here's the corresponding unitary matrix.

```python
unitary(circuit)
```

    |1.00 0.00|
    |-0.00 -1.00|

A more interesting gate is called the _Hadamard gate_, denoted by the symbol `H`. Let's see what it does.

```python
circuit = QuantumCircuit(1)
circuit.h(0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_43_0.svg)

```python
statevector(circuit)
```

    |0.71|
    |0.71|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_44_1.svg)

Finally, an interesting result! It might look like the vector was simply rotated by 90° around the y axis, but if that were the case the operation wouldn't be reversible: applying the same gate again wouldn't bring the vector back to its starting point, but would push it even further, all the way to $|1\rangle$. The Hadamard gate actually takes a stranger path: it can be decomposed into a 180° rotation around the x axis followed by a -90° rotation around the y axis, or we can see it as a circular rotation around a pivot placed at 45°, as described on [StackExchange](https://physics.stackexchange.com/a/455373).

![Hadamard on the Bloch sphere](https://i.stack.imgur.com/9kbe3.png)

Here's the unitary matrix: the values are a rounding of $1 \over \sqrt 2$, which is why it's usually written as $$\frac{1}{\sqrt 2} \begin{bmatrix}1 & 1\\ 1 & -1\end{bmatrix}$$

```python
unitary(circuit)
```

    |0.71 0.71|
    |0.71 -0.71|

The vector is in a superposition of states: it's not $|0\rangle$, it's not $|1\rangle$, it's a bit of both. In the literature it's called $|+\rangle$ (_plus ket_) and its opposite $|-\rangle$ (_minus ket_). For completeness, the vectors lying on the y axis are called $|\uparrow\rangle$ (_up ket_) and $|\downarrow\rangle$ (_down ket_) respectively.

_Fun fact_: what is that $1 \over \sqrt 2$ quantity? The length of a vector is computed with the Pythagorean theorem: $\sqrt{x^2 + y^2}$. If the vector must always have length 1 (it's a _unit vector_), then the vector $\begin{bmatrix} 1\\ 1\end{bmatrix}$ must be divided by its magnitude $\sqrt{1^2 + 1^2} = \sqrt 2$.

## Measurement

Every self-respecting piece of software is split into three phases:

- Input preparation
- Computation
- Output measurement

Quantum computers are no exception, except that if the qubit is in a superposition of states, measuring it will make it collapse onto one of the two possible states with 50% probability. The qubits we want to measure are mapped onto classical wires, so the output is made of plain bits.

```python
circuit = QuantumCircuit(1, 1)
circuit.measure(0, 0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_49_0.svg)

```python
counts(circuit)
```

    {'0': 100}

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_50_1.svg)

100 times out of 100 the qubit collapsed to bit 0. Let's do the same with the $|1\rangle$ state.

```python
circuit = QuantumCircuit(1, 1)
circuit.x(0)
circuit.measure(0, 0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_52_0.svg)

```python
counts(circuit)
```

    {'1': 100}

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_53_1.svg)

Here too, the qubit collapsed to bit 1 all 100 times. What happens if we use the Hadamard gate instead?

```python
circuit = QuantumCircuit(1, 1)
circuit.h(0)
circuit.measure(0, 0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_55_0.svg)

```python
counts(circuit)
```

    {'0': 50, '1': 50}

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_56_1.svg)

In this case the qubit collapsed to bit 0 exactly half of the time and to bit 1 the other half. Repeating the experiment we might get different results (that's why multiple shots are run), but always with 50% probability.

## Two-wire circuits

OK, let's move on to two quantum wires. As long as we use the gates introduced so far, the two wires will run like parallel tracks, without affecting each other.

```python
circuit = QuantumCircuit(2, 2)
circuit.x(1)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_58_0.svg)

The corresponding unitary matrix is a combination of the matrices on the single wires: to be precise, it's their tensor product $A \otimes B$.

```python
unitary(circuit)
```

    |0.00 0.00 1.00 0.00|
    |0.00 0.00 0.00 1.00|
    |1.00 0.00 0.00 0.00|
    |0.00 1.00 0.00 0.00|

Now let's measure the output: we shouldn't expect any surprises, the circuit should behave like a classical one. We can also add a "barrier" to visually separate the computation phase from the measurement phase.

```python
circuit.barrier()
circuit.measure([0,1], [0,1])
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_62_0.svg)

```python
counts(circuit)
```

    {'10': 100}

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_63_1.svg)

The result is, 100 times out of 100, the number 10! Of course we're talking binary, so it's a 1 (the most significant bit) and a 0 (the least significant one), which we can read as the number 2.

At this point you might expect `AND`, `OR`, `XOR` gates and all their combinations to exist. Not quite. Those gates wouldn't be reversible, so we need very special gates that let us trace the output back to the input, or that can also be used going "backwards in time".

The first interesting two-wire gate is `CNOT`, which negates one qubit (called target) if the other one (called control) is 1.

```python
circuit = QuantumCircuit(2, 2)
circuit.cnot(0, 1)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_66_0.svg)

The corresponding unitary matrix is not very intuitive, unless you read the [post](/blog/reverse-engineering-quantum-circuits) on my blog where I try to make sense of these matrices.

```python
unitary(circuit)
```

    |1.00 0.00 0.00 0.00|
    |0.00 0.00 0.00 1.00|
    |0.00 0.00 1.00 0.00|
    |0.00 1.00 0.00 0.00|

Let's see the circuit in action.

```python
circuit.barrier()
circuit.measure([0,1], [0,1])
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_70_0.svg)

```python
counts(circuit)
```

    {'00': 100}

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_71_1.svg)

Nothing happens when both qubits are initialized to zero. So let's try with the control qubit set to 1.

```python
circuit = QuantumCircuit(2, 2)
circuit.x(0)
circuit.cnot(0, 1)
circuit.barrier()
circuit.measure([0,1], [0,1])
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_73_0.svg)

```python
counts(circuit)
```

    {'11': 100}

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_74_1.svg)

All very intuitive — except that when we use this gate on qubits in superposition, the effect is completely different.

```python
circuit = QuantumCircuit(2, 2)
circuit.h([0, 1])
circuit.x(0)
circuit.cnot(0, 1)
circuit.h([0, 1])
circuit.barrier()
circuit.measure([0,1], [0,1])
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_76_0.svg)

```python
counts(circuit)
```

    {'00': 100}

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_77_1.svg)

The negated qubit turns out to be the control one! This behavior is called "phase kickback", a trick that stems from quantum entanglement, and it's at the heart of most of the major quantum algorithms.

There would be so much more to say, but this was meant to be just a short introduction. To leave you with a little cliffhanger, here's a three-wire gate called the "Toffoli gate", or `CCNOT`, which behaves like a `NAND` gate when the most significant bit is initialized to $|1\rangle$. And once you have a gate like `NAND`, [you can build any other kind of logic circuit](https://en.wikipedia.org/wiki/Functional_completeness).

```python
circuit = QuantumCircuit(3, 3)
circuit.x(2)
circuit.toffoli(0, 1, 2)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_80_0.svg)

Some useful links to start learning quantum computing:

- [Quantum computing for the very curious](https://quantum.country/qcvc)
- [The official Qiskit documentation](https://qiskit.org/documentation/qc_intro.html)
- [The Qiskit Textbook](https://qiskit.org/textbook/preface.html)
- [The video tutorials on YouTube](https://www.youtube.com/playlist?list=PLOFEBzvs-Vvp2xg9-POLJhQwtVktlYGbY)
- [My posts!](/blog)

_— IceOnFire_
