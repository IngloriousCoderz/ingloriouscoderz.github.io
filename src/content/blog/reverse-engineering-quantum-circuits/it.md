---
title: Reverse engineering dei circuiti quantistici
description: Un approccio algoritmico per definire e analizzare circuiti quantistici a più qubit.
author: Matteo Antony Mistretta
date: 2020-05-01
topic: quantum
original: en
---

Quando si studiano le basi del quantum computing si comincia a descrivere i circuiti con semplici calcoli su matrici $2 \times 2$ o $4 \times 4$, ma appena si esplorano i primi algoritmi ci si imbatte in oracoli che sembrano troppo complessi per essere rappresentati così. Eppure le matrici sono molto importanti per noi sviluppatori: sono come funzioni che possiamo progettare e ispezionare indipendentemente dall'input. Se potessimo descrivere qualunque circuito come una semplice combinazione di matrici, programmare circuiti sarebbe simile a programmare funzioni. Deve esserci un modo. Forse ne ho trovato uno.

Cominciamo importando le librerie necessarie e definendo alcune funzioni di comodo per disegnare facilmente circuiti e matrici unitarie:

```python
from qiskit import QuantumCircuit, execute, Aer
import math

def draw(circuit):
    return circuit.draw(output='mpl')

def unitary(circuit):
    unitary = execute(circuit, Aer.get_backend('unitary_simulator')).result().get_unitary()
    pretty_unitary = ''
    for row in range(len(unitary)):
        pretty_unitary += '|'
        for column in range(len(unitary[row])):
            value = unitary[row][column]
            if math.isclose(value.imag, 0, abs_tol=0.01):
                pretty_value = '{num.real:.0f}'.format(num=value)
            elif math.isclose(value.real, 0, abs_tol=0.01):
                pretty_value = '{num.imag:.0f}i'.format(num=value)
            else:
                pretty_value = '{num.real:.0f}+{num.imag:.0f}i'.format(num=value)

            pretty_unitary += pretty_value
            if column < len(unitary[row])-1:
                pretty_unitary += ' '
        pretty_unitary += '|\n'
    print(pretty_unitary)
```

Dato che avremo a che fare con matrici enormi, per semplificare i calcoli definiamo anche le seguenti due matrici "atomiche":

$$
\begin{gathered}
\bar{0} = |0\rangle\langle0| =
\begin{bmatrix}
1 & 0\\
0 & 0
\end{bmatrix}
\\[2em]
\bar{1} = |1\rangle\langle1| =
\begin{bmatrix}
0 & 0\\
0 & 1
\end{bmatrix}
\end{gathered}
$$

Il loro significato è semplicemente _"lo stato attuale del qubit è $|0\rangle$ (o $|1\rangle$, rispettivamente)."_

Anche se questi atomi non sono reversibili (ad es. $\bar{0} \cdot \bar{0}^\dagger = \bar{0} \not = I$), permettono di definire facilmente altre matrici come loro combinazione:

$$
\begin{gathered}
I =
\begin{bmatrix}
1 & 0\\
0 & 1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0\\
0 & 0
\end{bmatrix}
+
\begin{bmatrix}
0 & 0\\
0 & 1
\end{bmatrix}
= \bar{0} + \bar{1}
\\[2em]
CX =
\begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 0 & 0 & 1\\
0 & 0 & 1 & 0\\
0 & 1 & 0 & 0
\end{bmatrix}
=
\begin{bmatrix}
\bar{0} & \bar{1}\\
\bar{1} & \bar{0}
\end{bmatrix}
=
\begin{bmatrix}
\bar{0} & 0\\
0 & \bar{0}
\end{bmatrix}
+
\begin{bmatrix}
0 & \bar{1}\\
\bar{1} & 0
\end{bmatrix}
= I \otimes \bar{0} + X \otimes \bar{1}
\end{gathered}
$$

Notate come quest'ultima somma si possa interpretare facilmente così: _"Il secondo qubit resta invariato se il primo qubit è $|0\rangle$, ma viene invertito se il primo qubit è $|1\rangle$."_ È esattamente la descrizione di una porta CNOT! Sembra che questa rappresentazione renda i circuiti più intuitivi da descrivere.

Non tutte le matrici possono essere definite con questi due atomi, ad esempio:

$$
X =
\begin{bmatrix}
0 & 1\\
1 & 0
\end{bmatrix}
=
\begin{bmatrix}
0 & 0\\
1 & 0
\end{bmatrix}
+
\begin{bmatrix}
0 & 1\\
0 & 0
\end{bmatrix}
= |1\rangle\langle0| + |0\rangle\langle1|
$$

Questo suggerisce l'esistenza di un'altra coppia di atomi, ma ai fini dei nostri calcoli possiamo tenere così come sono matrici piccole come $I$ e $X$, sapendo che $|1\rangle\langle0|$ si può definire come $X \cdot \bar{0}$ e $|0\rangle\langle1|$ come $X \cdot \bar{1}$.

Ora siamo in grado di descrivere tutte le porte come combinazione di matrici $2 \times 2$, il che significa che possiamo:

1. Fare reverse engineering di enormi matrici unitarie scomponendole in atomi
2. Descrivere i circuiti definendo ogni porta come prodotto tensoriale di atomi
3. Fare "forward engineering" dei circuiti, descrivendo il risultato che ci aspettiamo!

## $CNOT_{01}$

Sappiamo come funziona la porta CNOT su un circuito a due qubit. Non ci aspettiamo sorprese se aggiungiamo un terzo qubit (del tutto inutile).

```python
circuit = QuantumCircuit(3)
circuit.cx(0, 1)
draw(circuit)
```

![png](/images/blog/reverse-engineering-quantum-circuits/output_5_0.png)

La matrice unitaria corrispondente dovrebbe essere piuttosto semplice: basta trattare la porta mancante su $q_2$ come una matrice identità. Trasformiamola in una combinazione di matrici più piccole:

$$
\begin{gathered}
I \otimes CX =
\begin{bmatrix}
CX & 0\\
0 & CX
\end{bmatrix}
=
\begin{bmatrix}
\bar{0} & \bar{1} & 0 & 0\\
\bar{1} & \bar{0} & 0 & 0\\
0 & 0 & \bar{0} & \bar{1}\\
0 & 0 & \bar{1} & \bar{0}
\end{bmatrix}\\
=
\begin{bmatrix}
\bar{0} & 0 & 0 & 0\\
0 & \bar{0} & 0 & 0\\
0 & 0 & \bar{0} & 0\\
0 & 0 & 0 & \bar{0}
\end{bmatrix}
+
\begin{bmatrix}
0 & \bar{1} & 0 & 0\\
\bar{1} & 0 & 0 & 0\\
0 & 0 & 0 & \bar{1}\\
0 & 0 & \bar{1} & 0
\end{bmatrix}\\
=
I \oplus I \oplus \bar{0} + I \oplus X \oplus \bar{1}
\end{gathered}
$$

Che possiamo interpretare come: _"$q_1$ resta invariato se $q_0$ è uguale a $|0\rangle$, ma viene invertito quando è $|1\rangle$; $q_2$ è irrilevante."_ È esattamente come descrivere una porta CNOT tra $q_0$ e $q_1$, con una matrice identità su $q_2$!

```python
unitary(circuit)
```

    |1 0 0 0 0 0 0 0|
    |0 0 0 1 0 0 0 0|
    |0 0 1 0 0 0 0 0|
    |0 1 0 0 0 0 0 0|
    |0 0 0 0 1 0 0 0|
    |0 0 0 0 0 0 0 1|
    |0 0 0 0 0 0 1 0|
    |0 0 0 0 0 1 0 0|

## $\text{CNOT}_{12}$

Non cambia molto se il terzo qubit viene invece posizionato in alto, come primo.

```python
circuit = QuantumCircuit(3)
circuit.cx(1, 2)
draw(circuit)
```

![png](/images/blog/reverse-engineering-quantum-circuits/output_9_0.png)

Anche qui possiamo calcolare facilmente la matrice unitaria risultante e scomporla in una combinazione di matrici più piccole, proprio come prima:

$$
\begin{gathered}
CX \otimes I =
\begin{bmatrix}
I & 0 & 0 & 0\\
0 & 0 & 0 & I\\
0 & 0 & I & 0\\
0 & I & 0 & 0
\end{bmatrix}\\
= \begin{bmatrix}
I & 0 & 0 & 0\\
0 & 0 & 0 & 0\\
0 & 0 & I & 0\\
0 & 0 & 0 & 0
\end{bmatrix}
+
\begin{bmatrix}
0 & 0 & 0 & 0\\
0 & 0 & 0 & I\\
0 & 0 & 0 & 0\\
0 & I & 0 & 0
\end{bmatrix}\\
= I \otimes \bar{0} \otimes I + X \otimes \bar{1} \otimes I
\end{gathered}
$$

L'interpretazione è molto simile alla precedente, cambia solo l'ordine: _"$q_2$ resta invariato se $q_1$ è uguale a $|0\rangle$, ma viene invertito se $q_1$ è $|1\rangle$; $q_0$ è irrilevante."_

```python
unitary(circuit)
```

    |1 0 0 0 0 0 0 0|
    |0 1 0 0 0 0 0 0|
    |0 0 0 0 0 0 1 0|
    |0 0 0 0 0 0 0 1|
    |0 0 0 0 1 0 0 0|
    |0 0 0 0 0 1 0 0|
    |0 0 1 0 0 0 0 0|
    |0 0 0 1 0 0 0 0|

## $\text{CNOT}_{02}$

```python
circuit = QuantumCircuit(3)
circuit.cx(0, 2)
draw(circuit)
```

![png](/images/blog/reverse-engineering-quantum-circuits/output_13_0.png)

Qui la cosa si complica, perché la $I$ si trova tra il controllo e il target della CNOT. Non ho idea di come costruire questa matrice, quindi lascio il calcolo a Qiskit:

```python
unitary(circuit)
```

    |1 0 0 0 0 0 0 0|
    |0 0 0 0 0 1 0 0|
    |0 0 1 0 0 0 0 0|
    |0 0 0 0 0 0 0 1|
    |0 0 0 0 1 0 0 0|
    |0 1 0 0 0 0 0 0|
    |0 0 0 0 0 0 1 0|
    |0 0 0 1 0 0 0 0|

Possiamo vedere questa matrice come:

$$
\begin{gathered}
\begin{bmatrix}
\bar{0} & 0 & \bar{1} & 0\\
0 & \bar{0} & 0 & \bar{1}\\
\bar{1} & 0 & \bar{0} & 0\\
0 & \bar{1} & 0 & \bar{0}
\end{bmatrix}\\
=
\begin{bmatrix}
\bar{0} & 0 & 0 & 0\\
0 & \bar{0} & 0 & 0\\
0 & 0 & \bar{0} & 0\\
0 & 0 & 0 & \bar{0}
\end{bmatrix}
+
\begin{bmatrix}
0 & 0 & \bar{1} & 0\\
0 & 0 & 0 & \bar{1}\\
\bar{1} & 0 & 0 & 0\\
0 & \bar{1} & 0 & 0
\end{bmatrix}\\
=
I \otimes I \otimes \bar{0} + X \otimes I \otimes \bar{1}
\end{gathered}
$$

Che potrebbe essere interpretata come: _"$q_2$ resta invariato se $q_0$ è uguale a $|0\rangle$, ma viene invertito quando $q_0$ è $|1\rangle$; $q_1$ è irrilevante."_ Esattamente come le due porte precedenti, ma ancora una volta in un ordine diverso!

Ora che sappiamo come fare reverse engineering di una matrice unitaria per ricavarne un circuito, è possibile anche fare il contrario, descrivendo il circuito attraverso le porte che lo compongono, o addirittura fare intuitivamente "forward engineering" di un circuito per ricavarne la matrice? Proviamo con gli oracoli che si incontrano in casi reali.

## Teletrasporto quantistico: $\text{CNOT}_{12} \cdot \text{CNOT}_{01}$

```python
circuit = QuantumCircuit(3)
circuit.cx(1, 2)
circuit.cx(0, 1)
draw(circuit)
```

![png](/images/blog/reverse-engineering-quantum-circuits/output_18_0.png)

Descriviamo questo circuito porta per porta:

$$
(I \otimes I \otimes \bar{0} + I \otimes X \otimes \bar{1}) \cdot (I \otimes \bar{0} \otimes I + X \otimes \bar{1} \otimes I)
$$

Eseguendo la moltiplicazione otteniamo questo risultato:

$$
= I \otimes \bar{0} \otimes \bar{0} + X \otimes \bar{1} \otimes \bar{0} + I \otimes X \cdot \bar{0} \otimes \bar{1} + X \otimes X \cdot \bar{1} \otimes \bar{1}
$$

Un'interpretazione potrebbe essere: _"se $q_0$ è $|0\rangle$ allora $q_2$ dipende solo da $q_1$; se $q_0$ è $|1\rangle$ allora $q_1$ viene invertito e $q_2$ lo segue a seconda del valore di $q_1$."_

Notate che aggiungere porte di Hadamard non cambia molto il risultato:

```python
circuit = QuantumCircuit(3)
circuit.h(1)
circuit.cx(1, 2)
circuit.cx(0, 1)
circuit.h(0)
draw(circuit)
```

![png](/images/blog/reverse-engineering-quantum-circuits/output_20_0.png)

$$
\begin{gathered}
(I \otimes I \otimes H) \cdot\\
(I \otimes I \otimes \bar{0} + I \otimes X \otimes \bar{1}) \cdot (I \otimes \bar{0} \otimes I + X \otimes \bar{1} \otimes I) \cdot\\
(I \otimes H \otimes I)
\end{gathered}
$$

$$
= I \otimes \bar{0} \cdot H \otimes H \cdot \bar{0} + X \otimes \bar{1} \cdot H \otimes H \cdot \bar{0} + I \otimes X \cdot \bar{0} \cdot H \otimes H \cdot \bar{1} + X \otimes X \cdot \bar{1} \cdot H \otimes H \cdot \bar{1}
$$

## Deutsch-Josza: $\text{CNOT}_{02} \cdot \text{CNOT}_{12}$

```python
circuit = QuantumCircuit(3)
circuit.cx(0, 2)
circuit.cx(1, 2)
draw(circuit)
```

![png](/images/blog/reverse-engineering-quantum-circuits/output_23_0.png)

Che cosa significa questo circuito? Come funziona? Facciamone il reverse engineering guardando la matrice unitaria calcolata:

```python
unitary(circuit)
```

    |1 0 0 0 0 0 0 0|
    |0 0 0 0 0 1 0 0|
    |0 0 0 0 0 0 1 0|
    |0 0 0 1 0 0 0 0|
    |0 0 0 0 1 0 0 0|
    |0 1 0 0 0 0 0 0|
    |0 0 1 0 0 0 0 0|
    |0 0 0 0 0 0 0 1|

La matrice ha questo aspetto:

$$
\begin{gathered}
\begin{bmatrix}
\bar{0} & 0 & \bar{1} & 0\\
0 & \bar{1} & 0 & \bar{0}\\
\bar{1} & 0 & \bar{0} & 0\\
0 & \bar{0} & 0 & \bar{1}
\end{bmatrix}
=
\begin{bmatrix}
\bar{0} & 0 & 0 & 0\\
0 & 0 & 0 & \bar{0}\\
0 & 0 & \bar{0} & 0\\
0 & \bar{0} & 0 & 0
\end{bmatrix}
+
\begin{bmatrix}
0 & 0 & \bar{1} & 0\\
0 & \bar{1} & 0 & 0\\
\bar{1} & 0 & 0 & 0\\
0 & 0 & 0 & \bar{1}
\end{bmatrix}\\
= CX \otimes \bar{0} + X \otimes I \otimes I \cdot CX \otimes \bar{1}
\end{gathered}
$$

Andiamo un po' più a fondo espandendo le porte CNOT:

$$
= (I \otimes \bar{0} \otimes \bar{0} + X \otimes \bar{1} \otimes \bar{0}) + (X \otimes I \otimes I) \cdot (I \otimes \bar{0} \otimes \bar{1} + X \otimes \bar{1} \otimes \bar{1})
$$

E ora, applicando il prodotto:

$$
= I \otimes \bar{0} \otimes \bar{0} + X \otimes \bar{1} \otimes \bar{0} + X \otimes \bar{0} \otimes \bar{1} + I \otimes \bar{1} \otimes \bar{1}
$$

Che potrebbe essere interpretato come: _"$q_2$ viene invertito se solo uno degli altri due è uguale a $|1\rangle$. In ogni altro caso resta invariato."_ Sembra uno XOR che mantiene gli input in $q_0$ e $q_1$ e conserva l'output in $q_2$. Ora ha senso!

Notate che il risultato trovato suggerisce di scomporre la matrice nel modo seguente, che è equivalente:

$$
\begin{bmatrix}
\bar{0} & 0 & 0 & 0\\
0 & 0 & 0 & 0\\
0 & 0 & \bar{0} & 0\\
0 & 0 & 0 & 0
\end{bmatrix}
+
\begin{bmatrix}
0 & 0 & 0 & 0\\
0 & 0 & 0 & \bar{0}\\
0 & 0 & 0 & 0\\
0 & \bar{0} & 0 & 0
\end{bmatrix}
+
\begin{bmatrix}
0 & 0 & \bar{1} & 0\\
0 & 0 & 0 & 0\\
\bar{1} & 0 & 0 & 0\\
0 & 0 & 0 & 0
\end{bmatrix}
+
\begin{bmatrix}
0 & 0 & 0 & 0\\
0 & \bar{1} & 0 & 0\\
0 & 0 & 0 & 0\\
0 & 0 & 0 & \bar{1}
\end{bmatrix}
=
\begin{bmatrix}
\bar{0} & 0 & \bar{1} & 0\\
0 & \bar{1} & 0 & \bar{0}\\
\bar{1} & 0 & \bar{0} & 0\\
0 & \bar{0} & 0 & \bar{1}
\end{bmatrix}
$$

Potremmo anche descrivere il circuito come la sequenza delle sue porte:

$$
(I \otimes \bar{0} \otimes I + X \otimes \bar{1} \otimes I) \cdot (I \otimes I \otimes \bar{0} + X \otimes I \otimes \bar{1})
$$

Ora eseguiamo la moltiplicazione:

$$
= I \otimes \bar{0} \otimes \bar{0} + X \otimes \bar{0} \otimes \bar{1} + X \otimes \bar{1} \otimes \bar{0} + I \otimes \bar{1} \otimes \bar{1}
$$

Che è esattamente il risultato ottenuto con il reverse engineering.

## Simon: $CNOT_{02} \cdot CNOT_{03} \cdot CNOT_{12} \cdot CNOT_{13}$

```python
circuit = QuantumCircuit(4)
circuit.cx(0, 2)
circuit.cx(0, 3)
circuit.cx(1, 2)
circuit.cx(1, 3)
draw(circuit)
```

![png](/images/blog/reverse-engineering-quantum-circuits/output_28_0.png)

Proviamo un altro "forward engineering". Il circuito potrebbe essere descritto così:

1. _"$q_2$ viene invertito se $q_0$ o $q_1$ è $|1\rangle$"_
2. _"$q_3$ viene invertito se $q_0$ o $q_1$ è $|1\rangle$"_
3. _"Ogni altro caso non cambia lo stato di $q_2$ o $q_3$"_

Ora, in matematica:

$$
\begin{gathered}
\text{1. } (I \otimes X \otimes \bar{0} \otimes \bar{1}) + (I \otimes X \otimes \bar{1} \otimes \bar{0})\\
\text{2. } (X \otimes I \otimes \bar{0} \otimes \bar{1}) + (X \otimes I \otimes \bar{1} \otimes \bar{0})\\
\text{3. } (I \otimes I \otimes \bar{0} \otimes \bar{0}) + (I \otimes I \otimes \bar{1} \otimes \bar{1})
\end{gathered}
$$

Possiamo semplificare ancora combinando 1. e 2., dato che entrambi i qubit target vengono invertiti contemporaneamente:

$$
\begin{gathered}
\text{1+2. } (X \otimes X \otimes \bar{0} \otimes \bar{1}) + (X \otimes X \otimes \bar{1} \otimes \bar{0})\\
\text{3. } (I \otimes I \otimes \bar{0} \otimes \bar{0}) + (I \otimes I \otimes \bar{1} \otimes \bar{1})
\end{gathered}
$$

Se la descrizione è corretta, la matrice risultante dovrebbe essere:

$$
\begin{bmatrix}
0 & 0 & 0 & 0 & 0 & 0 & \bar{1} & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & \bar{0}\\
0 & 0 & 0 & 0 & \bar{1} & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & \bar{0} & 0 & 0\\
0 & 0 & \bar{1} & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & \bar{0} & 0 & 0 & 0 & 0\\
\bar{1} & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & \bar{0} & 0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix}
+
\begin{bmatrix}
\bar{0} & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & \bar{1} & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & \bar{0} & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & \bar{1} & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & \bar{0} & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & \bar{1} & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & \bar{0} & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & \bar{1}
\end{bmatrix}
=
\begin{bmatrix}
\bar{0} & 0 & 0 & 0 & 0 & 0 & \bar{1} & 0\\
0 & \bar{1} & 0 & 0 & 0 & 0 & 0 & \bar{0}\\
0 & 0 & \bar{0} & 0 & \bar{1} & 0 & 0 & 0\\
0 & 0 & 0 & \bar{1} & 0 & \bar{0} & 0 & 0\\
0 & 0 & \bar{1} & 0 & \bar{0} & 0 & 0 & 0\\
0 & 0 & 0 & \bar{0} & 0 & \bar{1} & 0 & 0\\
\bar{1} & 0 & 0 & 0 & 0 & 0 & \bar{0} & 0\\
0 & \bar{0} & 0 & 0 & 0 & 0 & 0 & \bar{1}
\end{bmatrix}
$$

Funzionerà?

```python
unitary(circuit)
```

    |1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0|
    |0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0|
    |0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0|
    |0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0|
    |0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0|
    |0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0|
    |0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0|
    |0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0|
    |0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0|
    |0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0|
    |0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0|
    |0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0|
    |0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0|
    |0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0|
    |0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0|
    |0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1|

Funziona! Ora siamo in grado di costruire e capire circuiti facilmente, usando solo il buon senso!

EDIT: mi sono appena imbattuto in un paio di risposte su [StackExchange](https://quantumcomputing.stackexchange.com/questions/5179/how-to-construct-matrix-of-regular-and-flipped-2-qubit-cnot) che sembrano arrivare alla stessa conclusione per una domanda sulla porta CNOT. A quanto pare si parla di "metodo algoritmico" o di "uso dei proiettori". Non sembra però esserci uno standard, chissà perché.

```
_— IceOnFire_
```
