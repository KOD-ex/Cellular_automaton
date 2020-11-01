# Игра жизнь

![Cellular automaton](https://user-images.githubusercontent.com/64311703/97787368-86cdf680-1ba9-11eb-84e5-50aa6b695873.png)

[**Игра «Жизнь»**](https://ru.wikipedia.org/wiki/Игра_«Жизнь») – клеточный автомат, придуманный английским математиком Джоном Конвеем в 1970 году.

Реализация на **JavaScript** и **HTML**
[**ЧЕКАЙТЕ**](https://kod-ex.github.io/Game_of_life/)

## Правила

* Место действия этой игры — «вселенная» — это размеченная на клетки поверхность или плоскость — безграничная, ограниченная, или замкнутая (в пределе — бесконечная плоскость).
* Каждая клетка на этой поверхности может находиться в двух состояниях: быть «живой» (заполненной) или быть «мёртвой» (пустой). Клетка [[Окрестность Мура|имеет восемь соседей]], окружающих её.
* Распределение живых клеток в начале игры называется первым поколением. Каждое следующее поколение рассчитывается на основе предыдущего по таким правилам:
    * в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
    * если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»)
* Игра прекращается, если
    * на поле не останется ни одной «живой» клетки
    * конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
    * при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная конфигурация; предыдущее правило, вырожденное до одного шага назад)

Игрок не принимает прямого участия в игре, а лишь расставляет или генерирует начальную конфигурацию «живых» клеток, которые затем взаимодействуют согласно правилам уже без его участия (он является наблюдателем).

Игрок может корректировать правила: назначать количество соседних клеток нужных для появления новой клетки и количество соседних клеток нужных для выживания клетки.
