---
title: Programmiamo un calcolatore quantistico in Python
description: Un'introduzione al quantum computing in italiano, partendo dal codice.
author: IceOnFire
---

_Attenzione_: parleremo di circuiti logici, di vettori, di matrici e di fisica quantistica. Riservato ai più coraggiosi!

Se riconoscete il seguente circuito logico siete sulla buona strada:

![half adder](https://upload.wikimedia.org/wikipedia/commons/f/f4/Figura_HA.jpg)

Per provare il codice che segue sul proprio computer è necessario installare [Qiskit](https://qiskit.org/documentation/install.html), e possibilmente l'estensione di [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) per [Visual Studio Code](https://code.visualstudio.com/).

Un ringraziamento particolare va a [Federico Mattei](https://www.linkedin.com/in/federicomattei/) di [IBM](https://www.ibm.com/) il quale, grazie a un workshop tenuto per [Powercoders](https://powercoders.org/), mi ha appassionato alla materia:

<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B-1QUyYon2n/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="13" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/B-1QUyYon2n/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/B-1QUyYon2n/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Inglorious Coderz (@ingloriouscoderz)</a></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>

e a [Gabriele Agliardi](https://www.linkedin.com/in/gabriele-agliardi-50471047/) sempre di IBM, il quale ha letto e validato i miei articoli:

<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B_vG_WWIOwF/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="13" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/B_vG_WWIOwF/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/B_vG_WWIOwF/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Inglorious Coderz (@ingloriouscoderz)</a></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>

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

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_7_0.svg)

I circuiti quantici sono rappresentabili matematicamente come matrici unitarie, in parole povere sono operazioni sempre reversibili. I circuiti possono essere eseguiti su diversi backend, simulati o reali, e per ispezionare la corrispondente matrice unitaria utilizzeremo un simulatore apposito.

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

È la matrice identità! In pratica questo circuito non fa nessuna modifica all'output. In effetti possiamo usare proprio la porta logica `I`, che corrisponde alla matrice identità.

```python
circuit = QuantumCircuit(1)
circuit.i(0)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_13_0.svg)

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

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_16_1.svg)

Questo è il vettore chiamato $|0\rangle$.

_Curiosità_: ma se il qubit opera in un mondo tridimensionale, perché il vettore ha solo due numeri? Per comodità, sull'asse delle y utilizzeremo il numero `i` (o `j`). Quindi a dirla tutta il qubit è rappresentato con un vettore bidimensionale di numeri complessi! Segue un esempio.

```python
circuit = QuantumCircuit(1)
circuit.initialize([1/math.sqrt(2), 1j/math.sqrt(2)], 0)
statevector(circuit)
```

    |0.71|
    |0.71i|

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_18_1.svg)

Segue la matrice unitaria.

```python
unitary(circuit)
```

    |0.71 -0.71|
    |0.71i 0.71i|

In pratica, in tutti gli algoritmi che ho visto finora non c'è davvero bisogno di scomodare la terza dimensione, pertanto possiamo trattare il vettore come puramente bidimensionale.

Vediamo la prima semplice porta logica che ha un qualche effetto: la porta `X` (anche detta `NOT`).

```python
circuit = QuantumCircuit(1)
circuit.x(0)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_23_0.svg)

La matrice associata inverte il vettore di input.

```python
unitary(circuit)
```

    |0.00 1.00|
    |1.00 0.00|

E infatti il vettore risultante è ribaltato. Questo è il vettore chiamato $|1\rangle$.

```python
statevector(circuit)
```

    |0.00|
    |1.00|

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_27_1.svg)

Anche questa matrice è unitaria, infatti se proviamo a fare una doppia negazione otteniamo di nuovo la matrice identità.

```python
circuit = QuantumCircuit(1)
circuit.x(0)
circuit.x(0)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_29_0.svg)

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

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_31_1.svg)

Come esiste la porta logica `X`, esistono anche le porte logiche `Y` e `Z`. Tutte e tre ruotano il vettore di stato di 180° attorno al rispettivo asse, e costituiscono le porte logiche di Pauli. Analizzando il loro output diventa forse più chiaro perché sia chiama preferibilmente `X` e non `NOT`.

```python
circuit = QuantumCircuit(1)
circuit.y(0)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_33_0.svg)

```python
statevector(circuit)
```

    |0.00|
    |1.00i|

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_34_1.svg)

La porta `Y` pare ottenere lo stesso risultato della porta `X`? In effetti sì, ma ruota il vettore attorno all'asse y anziché x! Questa è la sua matrice, per i più curiosi.

```python
unitary(circuit)
```

    |0.00 -1.00i|
    |1.00i 0.00|

Come previsto, include dei numeri complessi in quanto stiamo mettendo in ballo l'asse y. Ma il risultato è lo stesso della porta `X`.

```python
circuit = QuantumCircuit(1)
circuit.z(0)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_38_0.svg)

```python
statevector(circuit)
```

    |1.00|
    |-0.00|

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_39_1.svg)

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

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_43_0.svg)

```python
statevector(circuit)
```

    |0.71|
    |0.71|

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_44_1.svg)

Finalmente abbiamo ottenuto un risultato interessante! Potrebbe sembrare che il vettore sia stato ruotato solo di 45° attorno all'asse y, ma se così fosse l'operazione non sarebbe invertibile: una nuova applicazione della stessa porta allontanerebbe ancora di più il vettore dallo stato originale, fino a portarlo a `|1〉`. La porta di Hadamard in realtà fa un giro più strano: una rotazione circolare.

![source: https://physics.stackexchange.com/questions/313959/visual-interpretation-on-the-bloch-sphere-when-hadamard-gate-is-applied-twice](https://i.stack.imgur.com/9kbe3.png)

Di seguito la matrice unitaria: le quantità sono un arrotondamento di $1 \over \sqrt 2$, infatti in genere si scrive come $$\frac{1}{\sqrt 2} \begin{bmatrix}1 & 1\\ 1 & -1\end{bmatrix}$$

```python
unitary(circuit)
```

    |0.71 0.71|
    |0.71 -0.71|

Il vettore si trova in una sovrapposizione di stati: non è $|0\rangle$, non è $|1\rangle$, ma è un po' di entrambi. In letteratura si chiama $|+\rangle$.

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

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_49_0.svg)

```python
counts(circuit)
```

    {'0': 100}

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_50_1.svg)

Proviamo a fare lo stesso sullo stato $|1\rangle$.

```python
circuit = QuantumCircuit(1, 1)
circuit.x(0)
circuit.measure(0, 0)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_52_0.svg)

```python
counts(circuit)
```

    {'1': 100}

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_53_1.svg)

Che succede se invece usiamo la porta di Hadamard?

```python
circuit = QuantumCircuit(1, 1)
circuit.h(0)
circuit.measure(0, 0)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_55_0.svg)

```python
counts(circuit)
```

    {'0': 50, '1': 50}

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_56_1.svg)

## Circuiti a due fili

Ok, passiamo a due fili quantici. Finché usiamo le porte che abbiamo introdotto finora i due fili viaggieranno come binari in parallelo, senza impattare l'uno sull'altro.

```python
circuit = QuantumCircuit(2, 2)
circuit.x(1)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_58_0.svg)

La matrice unitaria corrispondente è una combinazione delle matrici sui singoli fili, per essere precisi è il loro prodotto tensoriale.

```python
unitary(circuit)
```

    |0.00 0.00 1.00 0.00|
    |0.00 0.00 0.00 1.00|
    |1.00 0.00 0.00 0.00|
    |0.00 1.00 0.00 0.00|

Proviamo ora a misurare l'output: non dovremmo aspettarci sorprese, il circuito si dovrebbe comportare come un circuito classico. Possiamo anche aggiungere una "barriera" per distinguere meglio la fase di computazione da quella di misurazione.

```python
circuit.barrier()
circuit.measure([0,1], [0,1])
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_62_0.svg)

```python
counts(circuit)
```

    {'10': 100}

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_63_1.svg)

Il risultato è, 10 volte su 10, il numero 10! Ovviamente stiamo parlando in binario, quindi si tratta di 1 (il bit più significativo) e 0 (quello meno significativo). A questo punto ci si potrebbe aspettare che esistano le porte `AND`, `OR` `XOR`, e tutte le diverse combinazioni. Non proprio. Tali porte non sarebbero reversibili, pertanto abbiamo bisogno di porte molto particolari, che dall'output consentano di risalire a qual era l'input, o che possano essere utilizzate anche andando "indietro nel tempo".

La prima porta interessante a due fili quantici è la `CNOT`, che nega un qubit (chiamato target) se l'altro (chiamato control) vale 1.

```python
circuit = QuantumCircuit(2, 2)
circuit.cnot(0, 1)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_66_0.svg)

La matrice unitaria corrispondende non è molto intuitiva, a meno che non vi leggiate il [post](https://ingloriouscoderz.it/blog/reverse-engineering-quantum-circuits/) sul mio blog dove cerco di dare un senso a queste matrici.

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

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_70_0.svg)

```python
counts(circuit)
```

    {'00': 100}

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_71_1.svg)

Nessun risultato quando entrambi i qubit sono inizializzati a zero. Proviamo allora con il qubit di controllo a 1.

```python
circuit = QuantumCircuit(2, 2)
circuit.x(0)
circuit.cnot(0, 1)
circuit.barrier()
circuit.measure([0,1], [0,1])
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_73_0.svg)

```python
counts(circuit)
```

    {'11': 100}

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_74_1.svg)

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

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_76_0.svg)

```python
counts(circuit)
```

    {'00': 100}

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_77_1.svg)

Il qubit negato risulta essere quello di controllo! Questo comportamento si chiama "phase kickback", un trucchetto derivante dall'entanglement quantistico, ed è alla base della maggior parte degli algoritmi quantistici più importanti.

Ci sarebbe ancora tantissimo da dire, ma questa voleva solo essere una breve introduzione. Tanto per lasciare un piccolo cliffhanger anticipo l'esistenza di una porta logica a tre fili quantici chiamata "porta di Toffoli" o anche `CCNOT`, che si comporta come una porta `NAND` quando il bit più significativo è inizializzato a $|1\rangle$. E una volta che hai una porta come la `NAND` puoi creare qualsiasi altro tipo di circuito logico.

```python
circuit = QuantumCircuit(3, 3)
circuit.x(2)
circuit.toffoli(0, 1, 2)
draw(circuit)
```

![svg](/static/images/blog/programmiamo-un-calcolatore-quantistico-in-python/2021-03-11-programmiamo-un-calcolatore-quantistico-in-python_80_0.svg)

Alcuni link utili per cominciare a imparare il Quantum Computing:

- [Quantum computing for the very curious](https://quantum.country/qcvc)
- [La documentazione ufficiale di Qiskit](https://qiskit.org/documentation/qc_intro.html)
- [Il Qiskit Textbook](https://qiskit.org/textbook/preface.html)
- [I video tutorial su YouTube](https://www.youtube.com/playlist?list=PLOFEBzvs-Vvp2xg9-POLJhQwtVktlYGbY)
- I miei post!

```
# IceOnFire
```
