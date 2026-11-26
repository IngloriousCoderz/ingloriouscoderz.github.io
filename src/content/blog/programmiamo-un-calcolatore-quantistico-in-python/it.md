---
title: Programmiamo un calcolatore quantistico in Python
description: Un'introduzione al quantum computing in italiano, partendo dal codice.
author: Matteo Antony Mistretta
date: 2021-03-11
topic: quantum
original: it
---

_Attenzione_: parleremo di circuiti logici, di vettori, di matrici e di fisica quantistica. Riservato ai più coraggiosi!

Se riconoscete il seguente schema come un circuito logico allora siete sulla buona strada:

![Half Adder](https://upload.wikimedia.org/wikipedia/commons/f/f4/Figura_HA.jpg)

Questo articolo è un tentativo di spiegare le basi del quantum computing in modo semplice, lineare e sperimentale, partendo più dal codice che dalla matematica o dalla fisica; materie che, per quanto affascinanti, non sono alla portata di tutti e forse sono più utili a spiegare come funzionano le cose piuttosto che come usarle. Insomma, questo è un post per ingegneri più che per scienziati.

Per provare il codice che segue sul proprio computer è necessario installare [Qiskit](https://qiskit.org/documentation/install.html), e possibilmente l'estensione di [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) per [Visual Studio Code](https://code.visualstudio.com/).

Un ringraziamento particolare va a [Federico Mattei](https://www.linkedin.com/in/federicomattei/) di [IBM](https://www.ibm.com/) il quale, grazie a un workshop tenuto per [Powercoders](https://powercoders.org/), mi ha appassionato alla materia:

> 📸 [Guarda il post su Instagram](https://www.instagram.com/p/B-1QUyYon2n/)

e a [Gabriele Agliardi](https://www.linkedin.com/in/gabriele-agliardi-50471047/) sempre di IBM, il quale ha letto e validato i miei articoli:

> 📸 [Guarda il post su Instagram](https://www.instagram.com/p/B_vG_WWIOwF/)

Ok, cominciamo. Per prima cosa importiamo le librerie necessarie.

```python
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_bloch_multivector, plot_histogram
import math
```

Poi qualche utile funzione per disegnare o formattare meglio l'output. Non vale la pena sforzarsi di capire che cosa fanno queste funzioni al momento, torniamoci più tardi.

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

## Porte logiche

Il calcolatore più semplice che possiamo realizzare è un circuito con un solo filo quantico, senza porte logiche.

```python
circuit = QuantumCircuit(1)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_7_0.svg)

I circuiti quantici sono rappresentabili matematicamente come matrici unitarie: matematicamente significa che queste matrici, moltiplicate per la loro trasposta coniugata, danno la matrice identità ($A \cdot A^\dagger = I$), ma in parole povere indicano operazioni sempre reversibili, cioè operazioni che possono essere anche effettuate indietro nel tempo, o che dall'output possono far risalire a qual era l'input iniziale. Se si vuole approfondire che cosa significa e perché, possiamo trovare un'ottima risposta su [StackExchange](https://physics.stackexchange.com/a/270331):

> Quantum gates have to be reversible because quantum mechanics is reversible (and even more specifically it is unitary). It's just an observed fact about the universe. (Even measurement can be modeled as a reversible unitary operation, inconvenient though that may be.)
>
> Actually, classical computers also have to be reversible. We just happen to be able to sidestep the problem by throwing out accumulated garbage information as we go. Throwing out garbage information during quantum computations would also be possible, but because discarded garbage information counts as a measurement and measurement tends to break quantum algorithms... not so viable.

I circuiti possono essere eseguiti su diversi backend, simulati o reali, e per ispezionare la corrispondente matrice unitaria utilizzeremo un simulatore apposito.

```python
backend = Aer.get_backend('unitary_simulator')
result = execute(circuit, backend).result()
result.get_unitary()
```

    array([[1.+0.j, 0.+0.j],
           [0.+0.j, 1.+0.j]])

Dato che la matrice unitaria così è poco comprensibile, utilizziamo una delle funzioni descritte all'inizio dell'articolo per formattarla meglio.

```python
unitary(circuit)
```

    |1.00 0.00|
    |0.00 1.00|

È la matrice identità! In pratica questo circuito non fa nessuna modifica all'input iniziale. In effetti possiamo usare proprio la porta logica `I`, che corrisponde alla matrice identità.

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

L'input non è un bit, cioè uno scalare che vale 0 o 1, ma un qubit, cioè un vettore in uno spazio tridimensionale. Vediamo com'è fatto.

```python
statevector(circuit)
```

    |1.00|
    |0.00|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_16_1.svg)

Questo è il vettore chiamato $|0\rangle$ (_zero ket_) nella notazione di Dirac (aka _bra-ket notation_).

_Curiosità_: ma se il qubit opera in un mondo tridimensionale, perché il vettore ha solo due dimensioni? Per comodità, sull'asse delle y utilizzeremo il numero `i` (o `j`). Quindi a dirla tutta il qubit è rappresentato con un vettore bidimensionale di numeri complessi! Segue un esempio.

```python
circuit = QuantumCircuit(1)
circuit.initialize([1/math.sqrt(2), 1j/math.sqrt(2)], 0)
statevector(circuit)
```

    |0.71|
    |0.71i|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_18_1.svg)

Segue la matrice unitaria.

```python
unitary(circuit)
```

    |0.71 -0.71|
    |0.71i 0.71i|

In pratica, in tutti gli algoritmi che ho visto finora non c'è davvero bisogno di scomodare la terza dimensione, pertanto possiamo trattare il vettore come puramente bidimensionale.

Vediamo la prima semplice porta logica che ha un qualche effetto: la porta `X` (equivalente alla porta `NOT` nei circuiti classici).

```python
circuit = QuantumCircuit(1)
circuit.x(0)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_23_0.svg)

La matrice associata inverte il vettore di input.

```python
unitary(circuit)
```

    |0.00 1.00|
    |1.00 0.00|

E infatti il vettore risultante è ribaltato. Questo è il vettore chiamato $|1\rangle$ (_one ket_).

```python
statevector(circuit)
```

    |0.00|
    |1.00|

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_27_1.svg)

Anche questa matrice è unitaria, infatti se proviamo a fare una doppia negazione otteniamo di nuovo la matrice identità.

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

Come esiste la porta logica `X`, esistono anche le porte logiche `Y` e `Z`. Tutte e tre ruotano il vettore di stato di 180° attorno al rispettivo asse, e costituiscono le porte logiche di Pauli. Il `NOT` quindi non è solo una negazione in questo caso, è una rotazione di mezzo giro attorno a un asse. Che cosa succede se ruotiamo $|0\rangle$ attorno all'asse y?

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

La porta `Y` porta allo stesso risultato della porta `X`, solo ruotando attorno all'asse y! Questa è la sua matrice, per i più curiosi.

```python
unitary(circuit)
```

    |0.00 -1.00i|
    |1.00i 0.00|

Come previsto, include dei numeri complessi in quanto stiamo mettendo in ballo l'asse y.

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

La porta `Z` ha ruotato il vettore su sé stesso! Non molto utile quando il vettore è già parallelo all'asse z. Questa la matrice unitaria corrispondente.

```python
unitary(circuit)
```

    |1.00 0.00|
    |-0.00 -1.00|

Una porta logica più interessante si chiama _porta di Hadamard_, indicata con il simbolo `H`. Vediamo che cosa fa.

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

Finalmente abbiamo ottenuto un risultato interessante! Potrebbe sembrare che il vettore sia stato semplicemente ruotato di 90° attorno all'asse y, ma se così fosse l'operazione non sarebbe reversibile: una nuova applicazione della stessa porta non riporterebbe il vettore al punto di partenza, ma lo allontanerebbe ancora di più fino a portarlo a $|1\rangle$. La porta di Hadamard in realtà fa un giro più strano: la si può scomporre in una rotazione di 180° attorno all'asse x seguita da una rotazione di -90° attorno all'asse y, oppure possiamo vederla come una rotazione circolare attorno a un perno posizionato a 45° come descritto su [StackExchange](https://physics.stackexchange.com/a/455373).

![Hadamard on the Bloch sphere](https://i.stack.imgur.com/9kbe3.png)

Di seguito la matrice unitaria: le quantità sono un arrotondamento di $1 \over \sqrt 2$, infatti in genere si scrive come $$\frac{1}{\sqrt 2} \begin{bmatrix}1 & 1\\ 1 & -1\end{bmatrix}$$

```python
unitary(circuit)
```

    |0.71 0.71|
    |0.71 -0.71|

Il vettore si trova in una sovrapposizione di stati: non è $|0\rangle$, non è $|1\rangle$, ma è un po' di entrambi. In letteratura si chiama $|+\rangle$ (_plus ket_) e il suo opposto $|-\rangle$ (_minus ket_). Per completezza, i vettori che poggiano sull'asse y si chiamano rispettivamente $|\uparrow\rangle$ (_up ket_) e $|\downarrow\rangle$ (_down ket_).

_Curiosità_: che cos'è quella quantità $1 \over \sqrt 2$? La lunghezza di un vettore si calcola col teorema di Pitagora: $\sqrt{x^2 + y^2}$. Se il vettore deve essere sempre lungo 1 (è un _versore_, quindi un vettore a modulo 1), allora il vettore $\begin{bmatrix} 1\\ 1\end{bmatrix}$ va diviso per il suo modulo $\sqrt{1^2 + 1^2} = \sqrt 2$.

## Misurazione

Ogni software che si rispetti è suddiviso in tre fasi:

- Preparazione dell'input
- Computazione
- Misura dell'output

I computer quantistici non fanno eccezione, con l'aggiunta che se il qubit si trova in una sovrapposizione di stati, la misura lo farà collassare con una probabilità del 50% su uno dei due stati possibili. I qubit che intendiamo misurare vengono riportati su dei fili classici, quindi l'output sono semplici bit.

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

100 volte su 100 il qubit è collassato sul bit 0. Proviamo a fare lo stesso sullo stato $|1\rangle$.

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

Anche qui, il qubit è collassato tutte e 100 le volte sul bit 1. Che succede se invece usiamo la porta di Hadamard?

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

In questo caso il qubit ha collassato esattamente metà delle volte sul bit 0 e l'altra metà sul bit 1. Ripetendo l'esperimento potremmo ottenere risultati diversi (ecco perché vengono effettuati più tentativi), ma sempre con una probabilità del 50%.

## Circuiti a due fili

Ok, passiamo a due fili quantici. Finché usiamo le porte che abbiamo introdotto finora i due fili viaggieranno come binari in parallelo, senza impattare l'uno sull'altro.

```python
circuit = QuantumCircuit(2, 2)
circuit.x(1)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_58_0.svg)

La matrice unitaria corrispondente è una combinazione delle matrici sui singoli fili, per essere precisi è il loro prodotto tensoriale $A \otimes B$.

```python
unitary(circuit)
```

    |0.00 0.00 1.00 0.00|
    |0.00 0.00 0.00 1.00|
    |1.00 0.00 0.00 0.00|
    |0.00 1.00 0.00 0.00|

Proviamo ora a misurare l'output: non dovremmo aspettarci sorprese, il circuito si dovrebbe comportare come un circuito classico. Possiamo anche aggiungere una "barriera" per distinguere meglio graficamente la fase di computazione da quella di misurazione.

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

Il risultato è, 100 volte su 100, il numero 10! Ovviamente stiamo parlando in binario, quindi si tratta di un 1 (il bit più significativo) e uno 0 (quello meno significativo), che possiamo interpretare come il numero 2.

A questo punto ci si potrebbe aspettare che esistano le porte `AND`, `OR`, `XOR` e tutte le diverse combinazioni. Non proprio. Tali porte non sarebbero reversibili, pertanto abbiamo bisogno di porte molto particolari, che dall'output consentano di risalire a qual era l'input, o che possano essere utilizzate anche andando "indietro nel tempo".

La prima porta interessante a due fili quantici è la `CNOT`, che nega un qubit (chiamato target) se l'altro (chiamato control) vale 1.

```python
circuit = QuantumCircuit(2, 2)
circuit.cnot(0, 1)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_66_0.svg)

La matrice unitaria corrispondente non è molto intuitiva, a meno che non vi leggiate il [post](/it/blog/reverse-engineering-quantum-circuits) sul mio blog dove cerco di dare un senso a queste matrici.

```python
unitary(circuit)
```

    |1.00 0.00 0.00 0.00|
    |0.00 0.00 0.00 1.00|
    |0.00 0.00 1.00 0.00|
    |0.00 1.00 0.00 0.00|

Vediamo il circuito in azione.

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

Nessun risultato quando entrambi i qubit sono inizializzati a zero. Proviamo allora con il qubit di controllo a 1.

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

Tutto molto intuitivo, se non fosse che quando usiamo questa porta su qubit in sovrapposizione di stati l'effetto è totalmente diverso.

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

Il qubit negato risulta essere quello di controllo! Questo comportamento si chiama "phase kickback", un trucchetto derivante dall'entanglement quantistico, ed è alla base della maggior parte degli algoritmi quantistici più importanti.

Ci sarebbe ancora tantissimo da dire, ma questa voleva solo essere una breve introduzione. Tanto per lasciare un piccolo cliffhanger anticipo l'esistenza di una porta logica a tre fili quantici chiamata "porta di Toffoli" o anche `CCNOT`, che si comporta come una porta `NAND` quando il bit più significativo è inizializzato a $|1\rangle$. E una volta che hai una porta come la `NAND` [puoi creare qualsiasi altro tipo di circuito logico](https://en.wikipedia.org/wiki/Functional_completeness).

```python
circuit = QuantumCircuit(3, 3)
circuit.x(2)
circuit.toffoli(0, 1, 2)
draw(circuit)
```

![svg](/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_80_0.svg)

Alcuni link utili per cominciare a imparare il Quantum Computing:

- [Quantum computing for the very curious](https://quantum.country/qcvc)
- [La documentazione ufficiale di Qiskit](https://qiskit.org/documentation/qc_intro.html)
- [Il Qiskit Textbook](https://qiskit.org/textbook/preface.html)
- [I video tutorial su YouTube](https://www.youtube.com/playlist?list=PLOFEBzvs-Vvp2xg9-POLJhQwtVktlYGbY)
- [I miei post!](/it/blog)

_— IceOnFire_
