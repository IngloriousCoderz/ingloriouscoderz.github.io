---
title: Deutsch Algorithm
description: Using quantum superposition to guess the kind of a function in sub-exponential time.
author: IceOnFire
---

In April 7, 2020 I was introduced to the fundamentals of Quantum Computing, and it was love at first sight. I started studying [Python](https://www.python.org/) and [Qiskit](https://qiskit.org/) and [Jupyter](https://jupyter.org/) notebooks and, after working hard on the basics for a dozen days, I was stuck with the most basic algorithm. But then I worked even harder, and I got it finally. Here is the result of my studies as an exported Jupyter notebook.

```python
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_histogram, plot_bloch_multivector
from qiskit.quantum_info import Operator
```

Say we have a function $f$ which takes some zeroes and ones as input and returns 0 or 1 according to some logic. We cannot inspect the function, but we can invoke it as a black box and, based on the output of our experiments, we are able to understand the underlying logic. We call such a function an "oracle".

A one-bit oracle will only be able to produce the following results:

1. $f(0) = 0, f(1) = 0$
2. $f(0) = 1, f(1) = 1$
3. $f(0) = 0, f(1) = 1$
4. $f(0) = 1, f(1) = 0$

If the oracle behaves like 1. or 2. it means that whatever input I use I will always obtain the same result: the function is then considered "constant" (always zero or always one). If instead it behaves like 3. or 4. it means that sometimes I get 0 and sometimes 1: the function could then be considered "variable", although in the more generic algorithm of Deutsch-Josza we use the term "balanced" so we are going to use it here too (a balanced function gives 0 for half of the inputs and 1 for the other half, which by the way applies here too).

Although possibly confusing, we can call these functions for future reference like so:

1. Zero: always gives 0 (constant)
2. One: always gives 1 (constant)
3. Identity: gives the unchanged input (balanced)
4. Negation: gives the inverted input (balanced)

## The Classical Way

In order to guess the logic a classical computer would need to call the function twice:

```python
def guess(f):
    constant = 0
    balanced = 1

    if f(0) == 0:
        if f(1) == 0:
            return constant # zero
        elif f(1) == 1:
            return balanced # identity
    elif f(0) == 1:
        if f(1) == 0:
            return balanced # negation
        elif f(1) == 1:
            return constant # one

def zero(bit):
    return 0

def one(bit):
    return 1

def identity(bit):
    return bit

def negation(bit):
    return 1 if bit == 0 else 0

def test_guess(name, type):
    print(name, 'is', 'constant' if guess(type) == 0 else 'balanced')

test_guess('Zero', zero)
test_guess('One', one)
test_guess('Identity', identity)
test_guess('Negation', negation)
```

    Zero is constant
    One is constant
    Identity is balanced
    Negation is balanced

The Deutsch algorithm instead guesses if the oracle is constant or balanced with just one call to `f`, using the magic of quantum superposition. We will see how, but first we have to redefine the oracle in the quantum world.

## The Oracle

We could think that the oracle is a single-qubit gate, with just an input and an output:

```
input    +--------+    output
  |x⟩ ---| oracle |--- |f(x)⟩
         +--------+
```

As [this YouTube video](https://youtu.be/F_Riqjdh2oM) shows, the matrices associated to the four operations we can do on a single qubit are as follows:

1. Zero (constant): $\begin{bmatrix}1 & 1\\0 & 0\end{bmatrix}$
2. One (constant): $\begin{bmatrix}0 & 0\\1 & 1\end{bmatrix}$
3. Identity (balanced): $\begin{bmatrix}1 & 0\\0 & 1\end{bmatrix}$
4. Negation (balanced): $\begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}$ (equal to the Pauli gate X)

However these turn out to be useless, especially the first two since they are not even unitary.

As any gate in a quantum circuit, the oracle must be reversible (i.e. applying it twice will produce the Identity matrix). That's why we need to convert it into a two-qubits gate: the first qubit is the input value of the function, which isn't supposed to change, and the second qubit usually starts with $|0\rangle$ and will change into the result of the oracle:

```
 input    +--------+    input'
   |x⟩ ---|        |--- |x⟩
          | oracle |
   |0⟩ ---|        |--- |f(x)⟩
output    +--------+    output'
```

_Spoiler alert:_ when plugging the oracle in the Deutsch algorithm, `output` will instead be initialized as $|1\rangle$ and as a side effect `input'` will turn out to be $|0\rangle$ if the oracle is constant, and $|1\rangle$ if the oracle is balanced.

```python
qubits = 2
input = 0
output = 1
```

### Defining The Four Operators

But how do we implement the four different oracles? One way we could find the unitary matrices instead is by analyzing the expected output. Let's try with Zero:

$$
Zero \cdot |00\rangle = |00\rangle\\
Zero \cdot |01\rangle = |01\rangle
$$

So the vectors $\begin{bmatrix}1\\0\\0\\0\end{bmatrix}$ and $\begin{bmatrix}0\\1\\0\\0\end{bmatrix}$ are mapped to themselves. This suggests the following matrix:

$$
Zero = \begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
? & ? & ? & ?\\
? & ? & ? & ?
\end{bmatrix}
$$

Note that we don't care about the third and fourth rows, so we could just complete the matrix as an Identity.

```python
zero = Operator([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
])
```

This operator corresponds to not doing anthing at all inside the oracle!

```
 input    +------+    input'
   |x⟩ ---| ---- |--- |x⟩
          |      |
   |0⟩ ---| ---- |--- |0⟩
output    +------+    output'
```

Let's try now with One:

$$
One \cdot |00\rangle = |10\rangle\\
One \cdot |01\rangle = |11\rangle
$$

So $\begin{bmatrix}1\\0\\0\\0\end{bmatrix} \rightarrow \begin{bmatrix}0\\0\\1\\0\end{bmatrix}$ and $\begin{bmatrix}0\\1\\0\\0\end{bmatrix} \rightarrow \begin{bmatrix}0\\0\\0\\1\end{bmatrix}$ (first position mapped to third, second position mapped to fourth). This suggests the following matrix:

$$
One = \begin{bmatrix}
0 & 0 & 1 & 0\\
0 & 0 & 0 & 1\\
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0
\end{bmatrix}
$$

```python
one = Operator([
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0],
    [0, 1, 0, 0]
])
```

This operator corresponds to just putting an X gate on the output!

```
 input    +---------+    input'
   |x⟩ ---| ------- |--- |x⟩
          |         |
   |0⟩ ---| --|X|-- |--- |1⟩
output    +---------+    output'
```

Now for Identity:

$$
Identity \cdot |00\rangle = |00\rangle\\
Identity \cdot |01\rangle = |11\rangle
$$

So $\begin{bmatrix}1\\0\\0\\0\end{bmatrix} \rightarrow \begin{bmatrix}1\\0\\0\\0\end{bmatrix}$ and $\begin{bmatrix}0\\1\\0\\0\end{bmatrix} \rightarrow \begin{bmatrix}0\\0\\0\\1\end{bmatrix}$ (first position mapped to itself, second position mapped to fourth). This suggests the following matrix:

$$
Identity = \begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 0 & 0 & 1\\
0 & 0 & 1 & 0\\
0 & 1 & 0 & 0
\end{bmatrix}
$$

```python
identity = Operator([
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
])
```

This operator looks a lot like a CNOT on the output:

```
 input    +---------+    input'
   |x⟩ ---| ---*--- |--- |x⟩
          |    |    |
   |0⟩ ---| --|X|-- |--- |0⟩ or |1⟩, depending on |x⟩
output    +---------+    output'
```

And finally Negation:

$$
Negation \cdot |00\rangle = |10\rangle\\
Negation \cdot |01\rangle = |01\rangle
$$

So $\begin{bmatrix}1\\0\\0\\0\end{bmatrix} \rightarrow \begin{bmatrix}0\\0\\1\\0\end{bmatrix}$ and $\begin{bmatrix}0\\1\\0\\0\end{bmatrix} \rightarrow \begin{bmatrix}0\\0\\0\\1\end{bmatrix}$ (first position mapped to third, second position mapped to itself). This suggests the following matrix:

$$
Negation = \begin{bmatrix}
0 & 0 & 1 & 0\\
0 & 1 & 0 & 0\\
1 & 0 & 0 & 0\\
0 & 0 & 0 & 1
\end{bmatrix}
$$

```python
negation = Operator([
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1]
])
```

This operator could be interpreted as a CNOT on the output, sandwiched by two negations on the input:

```
 input    +---------------+    input'
   |x⟩ ---| --|X|-*-|X|-- |--- |x⟩
          |       |       |
   |0⟩ ---| -----|X|----- |--- |1⟩ or |0⟩, depending on |x⟩
output    +---------------+    output'
```

Why is that? Well, if we look at the truth table:

| output | input | output' | input' |
| ------ | ----- | ------- | ------ |
| 0      | 0     | 1       | 0      |
| 0      | 1     | 0       | 1      |
| 1      | 0     | 0       | 0      |
| 1      | 1     | 1       | 1      |

We can see it as a CNOT from `input` to `output`, but:

- `output'` is flipped when input is 0 instead of 1 so we need to negate `input` before applying the CNOT; and
- `input` must be negated again afterwards to turn back to its original state.

It's easy to prove that $(I \otimes X) \cdot CX \cdot (I \otimes X)$ gives that same exact matrix.

Or, as the YouTube video shows, we can even see it as a CNOT with a subsequent negation on `output`, which makes even more sense!

```
 input    +-------------+    input'
   |x⟩ ---| ---*------- |--- |x⟩
          |    |        |
   |0⟩ ---| --|X|-|X|-- |--- |1⟩ or |0⟩, depending on |x⟩
output    +-------------+    output'
```

### Implementing The Oracle

We can finally define our oracle as a circuit that can make use of one of these four operators.

```python
def oracle(type):
    oracle = QuantumCircuit(qubits, name='oracle')
    oracle.append(type, range(qubits))
    return oracle
```

We can verify that the operators are well defined by invoking the following test function using all possible combinations.

```python
def test_oracle(type, q1=0, q0=0):
    circuit = QuantumCircuit(2, 1)
    if (q0 == 1):
        circuit.x(input)
    if (q1 == 1):
        circuit.x(output)
    circuit.append(oracle(type), range(qubits))
    circuit.measure(output, 0)
    backend = Aer.get_backend('qasm_simulator')
    return execute(circuit, backend, shots=1, memory=True).result().get_memory()[0]

print('Zero(0):', test_oracle(zero, q0=0), '\tZero(1):', test_oracle(zero, q0=1))
print('One(0):', test_oracle(one, q0=0), '\tOne(1):', test_oracle(one, q0=1))
print('Identity(0):', test_oracle(identity, q0=0), '\tIdentity(1):', test_oracle(identity, q0=1))
print('Negation(0):', test_oracle(negation, q0=0), '\tNegation(1):', test_oracle(negation, q0=1))
```

    Zero(0): 0 	Zero(1): 0
    One(0): 1 	One(1): 1
    Identity(0): 0 	Identity(1): 1
    Negation(0): 1 	Negation(1): 0

## The Algorithm

The Deutsch algorithm is pretty straightforward. It just does the following:

1. Negates the `output` qubit so it starts with $|1\rangle$
2. Applies Hadamard gates to both input and output to turn them into a superposition
3. Applies the oracle, whichever it is
4. Converts back the input with a Hadamard gate and measures it, since it now holds the answer to the question: "is the function balanced?"

Note that we don't measure the output, since it's irrelevant and yields the wrong result anyway.

```python
def deutsch(oracle):
    cbits = 1
    circuit = QuantumCircuit(qubits, cbits, name='deutsch')
    circuit.x(output)
    circuit.barrier()
    circuit.h(input)
    circuit.h(output)
    circuit.append(oracle.to_instruction(), range(qubits))
    circuit.h(input)
    circuit.barrier()
    circuit.measure(input, 0)
    return circuit

circuit = deutsch(oracle(zero))
circuit.draw(output='mpl')
```

![png](/static/images/blog/deutsch.png)

```python
def test_deutsch(name, type):
    circuit = deutsch(oracle(type))
    backend = Aer.get_backend('qasm_simulator')
    guess = execute(circuit, backend, shots=1, memory=True).result().get_memory()[0]
    print(name, 'is', 'constant' if guess == '0' else 'balanced')

test_deutsch('Zero', zero)
test_deutsch('One', one)
test_deutsch('Identity', identity)
test_deutsch('Negation', negation)
```

    Zero is constant
    One is constant
    Identity is balanced
    Negation is balanced

Intuitively, the difference between Zero and One or Identity and Negation is lost in the Z-basis but the difference between constant and balanced is amplified, because when the function is balanced superposition flips the input qubit.

We came up with the same results as the classical algorithm, but with just one call to the function $f$. QED

```
# IceOnFire
```
