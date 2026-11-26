---
title: Gli oracoli negli algoritmi quantistici
description: Usare la sovrapposizione quantistica per ispezionare funzioni in tempo sub-esponenziale.
author: Matteo Antony Mistretta
date: 2020-04-25
topic: quantum
original: en
---

Il 7 aprile 2020, grazie a un bellissimo workshop tenuto da [Federico Mattei](https://www.linkedin.com/in/federicomattei/) di [IBM](https://www.ibm.com/), ho scoperto i fondamenti del quantum computing, ed è stato amore a prima vista. Ho studiato freneticamente la matematica necessaria, il linguaggio [Python](https://www.python.org/), la libreria [Qiskit](https://qiskit.org/) e i notebook [Jupyter](https://jupyter.org/). Poi, dopo aver lavorato sodo sulle basi per una dozzina di giorni, mi sono bloccato sull'algoritmo più semplice. Ma ho lavorato ancora più sodo, e finalmente posso dire di averlo capito: il problema era che non riuscivo a capire perché e come andassero implementati i cosiddetti "oracoli". Ecco cosa ho scoperto.

Partiremo dallo scenario più semplice in cui un problema può essere risolto più velocemente da un computer quantistico: l'[algoritmo di Deutsch](https://en.wikipedia.org/wiki/Deutsch%E2%80%93Jozsa_algorithm#Deutsch's_algorithm). Per prima cosa importiamo tutto ciò che ci serve per implementare in Python il nostro oracolo e l'algoritmo:

```python
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_histogram
from qiskit.quantum_info import Operator
```

L'algoritmo di Deutsch non è particolarmente utile nella pratica, ma è un buon primo passo verso algoritmi quantistici più complessi. Supponiamo di avere una funzione $f$ che prende in input degli zeri e degli uno e restituisce 0 o 1 secondo una certa logica:

$$
\begin{gathered}
f: (x_0, x_1, x_2, ...) \rightarrow y \in \{0, 1\}\\
\text{dove } x_n \in \{0, 1\}
\end{gathered}
$$

Non possiamo ispezionare la funzione, ma possiamo invocarla come una [scatola nera](https://it.wikipedia.org/wiki/Scatola_nera) e, in base all'output dei nostri esperimenti, riusciamo a capirne la logica interna. Una funzione del genere si chiama "oracolo".

Un oracolo con un solo input può produrre soltanto i seguenti risultati:

1. $f(0) = 0, f(1) = 0$
2. $f(0) = 1, f(1) = 1$
3. $f(0) = 0, f(1) = 1$
4. $f(0) = 1, f(1) = 0$

Se l'oracolo si comporta come 1. o 2. significa che qualunque input io usi otterrò sempre lo stesso risultato: la funzione è quindi considerata "[costante](https://it.wikipedia.org/wiki/Funzione_costante)" (sempre zero o sempre uno). Se invece si comporta come 3. o 4. significa che a volte ottengo 0 e a volte 1: la funzione potrebbe essere considerata "variabile", anche se nell'algoritmo più generale di Deutsch-Jozsa - che risolve lo stesso problema per $n$ input - si usa il termine "[bilanciata](https://en.wikipedia.org/wiki/Balanced_boolean_function)", quindi lo useremo anche qui (una funzione bilanciata restituisce 0 per metà degli input e 1 per l'altra metà, cosa che peraltro vale anche in questo caso).

Per quanto possa creare un po' di confusione, per comodità chiameremo queste funzioni così:

1. Zero: restituisce sempre 0 (costante)
2. Uno: restituisce sempre 1 (costante)
3. Identità: restituisce l'input invariato (bilanciata)
4. Negazione: restituisce l'input invertito (bilanciata)

## L'approccio classico

Per indovinare la logica, un computer classico dovrebbe chiamare la funzione due volte:

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
```

Proviamo le quattro diverse funzioni:

```python
def zero(bit):
    return 0

def one(bit):
    return 1

def identity(bit):
    return bit

def negation(bit):
    return 1 - bit

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

L'algoritmo di Deutsch invece indovina se l'oracolo è costante o bilanciato con una sola chiamata a $f$, sfruttando la magia della sovrapposizione quantistica. Vedremo come, ma prima dobbiamo ridefinire l'oracolo nel mondo quantistico.

## L'oracolo

Inizialmente potremmo pensare di implementare l'oracolo come una porta a un solo qubit, con un solo `input` e un solo `output`:

```bash
input    +--------+    output
  |x⟩ ---| oracle |--- |f(x)⟩
         +--------+
```

Come mostra [questo video su YouTube](https://youtu.be/F_Riqjdh2oM), le matrici associate alle quattro operazioni possibili su un singolo qubit sarebbero le seguenti:

1. Zero (costante): $\begin{bmatrix}1 & 1\\0 & 0\end{bmatrix}$
2. Uno (costante): $\begin{bmatrix}0 & 0\\1 & 1\end{bmatrix}$
3. Identità (bilanciata): $\begin{bmatrix}1 & 0\\0 & 1\end{bmatrix}$ (uguale alla porta identità $I$)
4. Negazione (bilanciata): $\begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}$ (uguale alla porta di Pauli $X$)

Queste però si rivelano inutili, soprattutto le prime due, che non sono nemmeno [unitarie](https://it.wikipedia.org/wiki/Matrice_unitaria).

Come ogni porta di un circuito quantistico, l'oracolo deve essere [reversibile](https://en.wikipedia.org/wiki/Reversible_computing#Logical_reversibility) (cioè deve essere sempre possibile risalire a quale `input` ha generato l'`output` ottenuto). Per questo dobbiamo trasformarlo in una porta a due qubit: il primo qubit è il valore di `input` della funzione, che non dovrebbe cambiare attraversando l'oracolo, e il secondo è un `output` che di solito viene passato come $|0\rangle$ e si trasformerà nel risultato dell'oracolo:

```bash
 input    +--------+    input'
   |x⟩ ---|        |--- |x⟩
          | oracle |
   |0⟩ ---|        |--- |f(x)⟩
output    +--------+    output'
```

A un ingegnere del software potrebbe sembrare strano all'inizio, ma non è diverso dall'avere una funzione impura che prende due input e restituisce due output, uno dei quali modificato nel processo:

```python
def impure_function(input, output):
    output = input.upper()
    return {input, output}


print(impure_function('hello', '0'))
```

    {'hello', 'HELLO'}

L'oracolo però deve essere reversibile **sempre**, anche quando `output` viene passato come $|1\rangle$. Come gestiamo questo caso?

Se anche $|1\rangle$ venisse mappato su $|f(x)\rangle$, applicando la porta due volte perderemmo informazione: qual era il valore iniziale di `output`? Non reversibile. Per questo dobbiamo mappare $|1\rangle$ su un valore diverso, cioè $|\neg f(x)\rangle$. Ricapitolando:

| $y$ | $f(x)$ | $y'$            |
| --- | ------ | --------------- |
| $0$ | $0$    | $f(x) = 0$      |
| $0$ | $1$    | $f(x) = 1$      |
| $1$ | $0$    | $\neg f(x) = 1$ |
| $1$ | $1$    | $\neg f(x) = 0$ |

Il risultato che ci aspettiamo da `output'` ora assomiglia a uno XOR tra `output` (la $y$) e `output'` (la $f(x)$). Ecco perché la forma generica di un oracolo mappa `output'` non semplicemente su $|f(x)\rangle$ ma su $|y \oplus f(x)\rangle$.

```bash
 input    +--------+    input'
   |x⟩ ---|        |--- |x⟩
          | oracle |
   |y⟩ ---|        |--- |y ⊕ f(x)⟩
output    +--------+    output'
```

_Spoiler:_ quando inseriremo l'oracolo nell'algoritmo di Deutsch lo useremo in modo "non convenzionale": `output` verrà infatti inizializzato a $|1\rangle$ e, come effetto collaterale, sarà `input'` a cambiare!

Ora sappiamo che ci servono due qubit: il primo si chiamerà `input` e il secondo `output`.

```python
qubits = 2
input = 0
output = 1
```

## Definire i quattro operatori

Ma come implementiamo i quattro diversi oracoli? L'approccio migliore che ho trovato, e che spiegherò qui, è ricavarne le matrici unitarie analizzando l'output atteso.

### Zero

Sappiamo che qualunque sia l'`input`, `input'` resterà invariato e `output` passerà da $|0\rangle$ a... beh, $|0\rangle$. In notazione bra-ket, dove il bit meno significativo è `input`:

$$
\begin{gathered}
\text{Zero} \cdot |00\rangle = |00\rangle\\
\text{Zero} \cdot |01\rangle = |01\rangle
\end{gathered}
$$

Quindi i vettori $\begin{bmatrix}1 & 0 & 0 & 0\end{bmatrix}^T$ e $\begin{bmatrix}0 & 1 & 0 & 0\end{bmatrix}^T$ vengono mappati su sé stessi. Questo suggerisce la seguente matrice:

$$
\text{Zero} =
\begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
? & ? & ? & ?\\
? & ? & ? & ?
\end{bmatrix}
$$

E le ultime due righe? Ricordiamoci che l'oracolo deve essere reversibile, anche con un `output` pari a $|1\rangle$ (che sarà proprio il caso dell'algoritmo di Deutsch).

Sapendo che la funzione Zero deve restituire $\neg f(x)$ quando `output` è $|1\rangle$, possiamo completare la mappatura dell'output:

$$
\begin{gathered}
\text{Zero} \cdot |10\rangle = |10\rangle\\
\text{Zero} \cdot |11\rangle = |11\rangle
\end{gathered}
$$

Quindi anche i vettori $\begin{bmatrix}0 & 0 & 1 & 0\end{bmatrix}^T$ e $\begin{bmatrix}0 & 0 & 0 & 1\end{bmatrix}^T$ vengono mappati su sé stessi, il che completa la matrice come un'identità (grazie a [Gabriele Agliardi](https://www.linkedin.com/in/gabriele-agliardi-50471047/) per l'aiuto!):

$$
\text{Zero} =
\begin{bmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 1 & 0\\
0 & 0 & 0 & 1
\end{bmatrix}
$$

```python
zero = Operator([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
])
```

Come sappiamo, questo operatore corrisponde a non fare assolutamente nulla dentro l'oracolo:

```bash
 input    +------+    input'
   |x⟩ ---| ---- |--- |x⟩
          |      |
   |0⟩ ---| ---- |--- |0⟩
output    +------+    output'
```

### Uno

Questo oracolo è praticamente uguale a Zero, ma stavolta otterremo $|1\rangle$ qualunque sia l'`input`. In notazione bra-ket:

$$
\begin{gathered}
\text{Uno} \cdot |00\rangle = |10\rangle\\
\text{Uno} \cdot |01\rangle = |11\rangle
\end{gathered}
$$

Ora il vettore $\begin{bmatrix}1 & 0 & 0 & 0\end{bmatrix}^T$ viene mappato su $\begin{bmatrix}0 & 0 & 1 & 0\end{bmatrix}^T$ e $\begin{bmatrix}0 & 1 & 0 & 0\end{bmatrix}^T$ su $\begin{bmatrix}0 & 0 & 0 & 1\end{bmatrix}^T$, che possiamo anche descrivere così: "la prima posizione diventa la terza, e la seconda diventa la quarta". Questo ci porta subito alla matrice seguente, senza nemmeno dover verificare cosa succede quando `output` è $|1\rangle$:

$$
\text{Uno} =
\begin{bmatrix}
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

Questo operatore assomiglia a $X \otimes I$, che corrisponde a mettere semplicemente una porta $X$ sull'output:

```bash
 input    +---------+    input'
   |x⟩ ---| ------- |--- |x⟩
          |         |
   |0⟩ ---| --|X|-- |--- |1⟩
output    +---------+    output'
```

### Identità

Contrariamente a quanto suggerisce il nome, la matrice risultante non sarà la matrice identità. Infatti:

$$
\begin{gathered}
\text{Identità} \cdot |00\rangle = |00\rangle\\
\text{Identità} \cdot |01\rangle = |11\rangle
\end{gathered}
$$

Quindi $\begin{bmatrix}1 & 0 & 0 & 0\end{bmatrix}^T \rightarrow \begin{bmatrix}1 & 0 & 0 & 0\end{bmatrix}^T$ e $\begin{bmatrix}0 & 1 & 0 & 0\end{bmatrix}^T \rightarrow \begin{bmatrix}0 & 0 & 0 & 1\end{bmatrix}^T$ (la prima posizione resta tale, la seconda diventa la quarta). Questo suggerisce la seguente matrice:

$$
\text{Identità} =
\begin{bmatrix}
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

Questo operatore assomiglia a una CNOT sull'output:

```bash
 input    +---------+    input'
   |x⟩ ---| ---*--- |--- |x⟩
          |    |    |
   |0⟩ ---| --|X|-- |--- |0⟩ or |1⟩, depending on |x⟩
output    +---------+    output'
```

### Negazione

Seguendo lo stesso approccio, vediamo che:

$$
\begin{gathered}
\text{Negazione} \cdot |00\rangle = |10\rangle\\
\text{Negazione} \cdot |01\rangle = |01\rangle
\end{gathered}
$$

Quindi $\begin{bmatrix}1 & 0 & 0 & 0\end{bmatrix}^T \rightarrow \begin{bmatrix}0 & 0 & 1 & 0\end{bmatrix}^T$ e $\begin{bmatrix}0 & 1 & 0 & 0\end{bmatrix}^T \rightarrow \begin{bmatrix}0 & 0 & 0 & 1\end{bmatrix}^T$ (la prima posizione diventa la terza, la seconda resta tale). Questo suggerisce la seguente matrice:

$$
\text{Negazione} =
\begin{bmatrix}
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

Questo operatore può essere interpretato come una CNOT sull'output, racchiusa tra due $X$ sull'input:

```bash
 input    +---------------+    input'
   |x⟩ ---| --|X|-*-|X|-- |--- |x⟩
          |       |       |
   |0⟩ ---| -----|X|----- |--- |1⟩ or |0⟩, depending on |x⟩
output    +---------------+    output'
```

Perché? Beh, guardiamo la tabella di verità:

| $y$ | $x$ | $y'$ | $x'$ |
| --- | --- | ---- | ---- |
| $0$ | $0$ | $1$  | $0$  |
| $0$ | $1$ | $0$  | $1$  |
| $1$ | $0$ | $0$  | $0$  |
| $1$ | $1$ | $1$  | $1$  |

Possiamo vederla come una CNOT con `input` come controllo e `output` come target, ma:

- `output'` viene invertito quando `input` vale 0 anziché 1, quindi dobbiamo negare `input` prima di applicare la CNOT; e
- `input` va negato di nuovo subito dopo, per tornare al suo stato originale come `input'`.

È facile dimostrare che $(I \otimes X) \cdot CX \cdot (I \otimes X)$ dà esattamente la stessa matrice.

Oppure, come mostra il già citato [video su YouTube](https://youtu.be/F_Riqjdh2oM), possiamo vederla anche come una CNOT seguita da una negazione su `output`, il che in questo caso semplice ha ancora più senso.

```bash
 input    +-------------+    input'
   |x⟩ ---| ---*------- |--- |x⟩
          |    |        |
   |0⟩ ---| --|X|-|X|-- |--- |1⟩ or |0⟩, depending on |x⟩
output    +-------------+    output'
```

Perché allora complicarsi la vita con il "panino" di $X$? Beh, nei casi più generici, con più qubit in `input`, l'approccio a panino funziona sempre, come si può vedere nella documentazione dell'algoritmo di [Deutsch-Jozsa](https://qiskit.org/textbook/ch-algorithms/deutsch-josza.html#creating-quantum-oracles).

## Implementare gli oracoli

Potremmo ora costruire i quattro oracoli come i circuiti descritti sopra, oppure definire un'unica funzione che usa le quattro matrici unitarie che abbiamo già dichiarato.

```python
def oracle(type):
    oracle = QuantumCircuit(qubits, name='oracle')
    oracle.append(type, range(qubits))
    return oracle
```

Possiamo verificare che gli operatori siano ben definiti invocando la seguente funzione di test con tutte le combinazioni possibili.

```python
def test_oracle_with(type, q1=0, q0=0):
    circuit = QuantumCircuit(2, 1)
    if (q0 == 1):
        circuit.x(input)
    if (q1 == 1):
        circuit.x(output)
    circuit.append(oracle(type), range(qubits))
    circuit.measure(output, 0)
    backend = Aer.get_backend('qasm_simulator')
    return execute(circuit, backend, shots=1, memory=True).result().get_memory()[0]

def test_oracle(name, type):
    print(
        '{}(0):'.format(name), test_oracle_with(type, q0=0),
        '\t',
        '{}(1):'.format(name), test_oracle_with(type, q0=1)
    )

test_oracle('Zero', zero)
test_oracle('One', one)
test_oracle('Identity', identity)
test_oracle('Negation', negation)
```

    Zero(0): 0 	Zero(1): 0
    One(0): 1 	One(1): 1
    Identity(0): 0 	Identity(1): 1
    Negation(0): 1 	Negation(1): 0

## L'algoritmo

Ora che sappiamo come costruire gli oracoli il grosso è fatto, e in confronto l'algoritmo di Deutsch è piuttosto lineare. Fa semplicemente questo:

1. Nega il qubit `output`, in modo che parta da $|1\rangle$
2. Applica porte di Hadamard sia a `input` sia a `output` per portarli in sovrapposizione
3. Applica l'oracolo, qualunque esso sia, in modo "non convenzionale" (dato che al passo 1 abbiamo impostato la sua $y$ a $|1\rangle$)
4. Riconverte `input'` con una porta di Hadamard e lo misura
5. Il qubit `input'` ora sembra cambiato in alcuni casi: mantiene il valore $|0\rangle$ se la funzione nascosta era costante, o diventa $|1\rangle$ se era bilanciata.

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

![png](/images/blog/oracles-in-quantum-computing/deutsch.png)

Mettiamolo alla prova.

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

Funziona! Ma perché? Quando un oracolo contiene porte CNOT, racchiuderlo tra porte di Hadamard e partire con un `output` pari a $|1\rangle$ innesca il [phase kickback](https://qiskit.org/textbook/ch-gates/phase-kickback.html), che inverte il valore di `input` anziché di `output`. Solo gli oracoli bilanciati hanno porte CNOT, quindi solo gli oracoli bilanciati invertono l'`input`. Nel nostro caso:

1. Zero e Uno sono implementati senza porte CNOT: racchiuderli tra porte di Hadamard non ha alcun effetto sull'`input`, che resta invariato. Era $|0\rangle$ prima dell'algoritmo, è ancora $|0\rangle$ dopo. I due oracoli sono quindi costanti.
2. Identità e Negazione hanno porte CNOT: racchiuderli tra porte di Hadamard innesca il phase kickback, quindi il qubit `input` passa da $|0\rangle$ a $|1\rangle$. I due oracoli sono bilanciati.

E il valore di `output'`? Notate che nell'algoritmo non lo misuriamo. Il motivo è che ai fini del problema non ci interessa, e comunque contiene il risultato sbagliato. Supponiamo di testare l'oracolo Zero partendo con un `output` pari a $|1\rangle$: anche `output'` sarà $|1\rangle$, il che è sbagliato perché Zero dovrebbe restituire $|0\rangle$. Potremmo dire che, usando l'algoritmo, la differenza tra Zero e Uno o tra Identità e Negazione si perde nella base X, mentre la differenza tra costante e bilanciato viene amplificata.

Abbiamo ottenuto gli stessi risultati dell'algoritmo classico, ma con una sola chiamata alla funzione $f$. E ora che sappiamo tutto ciò che serve sugli oracoli possiamo capire meglio ogni altro algoritmo dello stesso tipo, come il più generico [Deutsch-Jozsa](https://qiskit.org/textbook/ch-algorithms/deutsch-josza.html) per input multipli, il [Bernstein-Vazirani](https://qiskit.org/textbook/ch-algorithms/bernstein-vazirani.html) che indovina un numero segreto in un colpo solo e l'algoritmo di [Simon](https://qiskit.org/textbook/ch-algorithms/simon.html), che cerca in tempo sub-esponenziale due input che danno lo stesso output.

```
_— IceOnFire_
```
