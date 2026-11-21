window.registerTopic({
  id: "function-distance",
  title: "Вариация функционала - расстояние между функциями.",
  questions: [
    {
      type: "theory",
      question: String.raw`Пусть $y_1(t)$ и $y_2(t)$ — бесконечно дифференцируемые функции на отрезке $[t_0, T]$, а расстояние $n$-го порядка задаётся формулой $\rho_n(y_1, y_2) = \max_{0 \le k \le n} \max_{t \in [t_0, T]} |y_1^{(k)}(t) - y_2^{(k)}(t)|$. Какое из следующих утверждений верно ВСЕГДА?`,
      options: [
        String.raw`С ростом порядка расстояние не возрастает: $\rho_0(y_1, y_2) \ge \rho_1(y_1, y_2) \ge \dots \ge \rho_n(y_1, y_2)$.`,
        String.raw`Если $\rho_1(y_1, y_2) = 0$ на $[t_0, T]$, то функции $y_1(t)$ и $y_2(t)$ всё равно могут отличаться на ненулевую константу $C \neq 0$.`,
        String.raw`Для любого $n \ge 0$ выполняется $\rho_n(y_1, y_2) \le \rho_{n+1}(y_1, y_2)$, причём равенство достигается тогда и только тогда, когда $\max_{t \in [t_0, T]} |y_1^{(n+1)}(t) - y_2^{(n+1)}(t)| \le \rho_n(y_1, y_2)$.`,
        String.raw`Максимум модуля разности функций $|y_1(t) - y_2(t)|$ и максимум модуля разности первых производных $|y_1'(t) - y_2'(t)|$ всегда достигаются в одной и той же точке $t^* \in [t_0, T]$.`
      ],
      correct: 2,
      explanation: String.raw`По определению $\rho_{n+1}(y_1, y_2) = \max\{\rho_n(y_1, y_2),\; \max_{t \in [t_0, T]} |y_1^{(n+1)}(t) - y_2^{(n+1)}(t)|\}$. Отсюда сразу следует монотонность $\rho_n \le \rho_{n+1}$, а равенство $\rho_{n+1} = \rho_n$ выполнено ровно тогда, когда максимум модуля разности $(n+1)$-х производных не превосходит $\rho_n$. Если $\rho_1 = 0$, то и $\rho_0 = 0$, значит $y_1(t) \equiv y_2(t)$ (никакой ненулевой константы быть не может). Точки максимума для разности функций и их производных в общем случае различны.`
    },
    {
      type: "practice",
      question: String.raw`Даны функции $y_1(t) = t^2$ и $y_2(t) = t^3$ на отрезке $[0, 1]$. Найдите расстояние 0-го порядка $\rho_0(y_1, y_2)$.`,
      options: [
        String.raw`$\frac{1}{4}$`,
        String.raw`$\frac{4}{27}$`,
        String.raw`$\frac{1}{3}$`,
        String.raw`$1$`
      ],
      correct: 1,
      explanation: String.raw`Ищем $\rho_0 = \max_{t \in [0, 1]} |t^2 - t^3|$. Найдём точки, подозрительные на экстремум функции $g(t) = t^2 - t^3$: $g'(t) = 2t - 3t^2 = t(2 - 3t) = 0 \Rightarrow t_1 = 0,\; t_2 = \frac{2}{3}$. Проверим значения $|g(t)|$ в критической точке и на концах отрезка: $|g(0)| = 0$, $|g(1)| = 0$, $|g(\frac{2}{3})| = \left|\frac{4}{9} - \frac{8}{27}\right| = \frac{4}{27}$. Следовательно, $\rho_0(y_1, y_2) = \frac{4}{27}$.`
    },
    {
      type: "practice",
      question: String.raw`Для тех же функций $y_1(t) = t^2$ и $y_2(t) = t^3$ на отрезке $[0, 1]$ (где $\rho_0 = \frac{4}{27}$) найдите расстояния 1-го и 2-го порядков: $\rho_1(y_1, y_2)$ и $\rho_2(y_1, y_2)$.`,
      options: [
        String.raw`$\rho_1 = \frac{1}{3}, \quad \rho_2 = 2$`,
        String.raw`$\rho_1 = 1, \quad \rho_2 = 2$`,
        String.raw`$\rho_1 = \frac{4}{27}, \quad \rho_2 = 4$`,
        String.raw`$\rho_1 = 1, \quad \rho_2 = 4$`
      ],
      correct: 3,
      explanation: String.raw`Для $\rho_1$: $y_1'(t) - y_2'(t) = 2t - 3t^2$. Стационарная точка находится из $2 - 6t = 0 \Rightarrow t = \frac{1}{3}$, где $|2(\frac{1}{3}) - 3(\frac{1}{9})| = \frac{1}{3}$. Проверяем границы отрезка $[0, 1]$: при $t = 0$ получаем $0$, а при $t = 1$ получаем $|2 - 3| = 1$. Значит, $\rho_1 = \max\left\{\frac{4}{27}, 1\right\} = 1$. Для $\rho_2$: $y_1''(t) - y_2''(t) = 2 - 6t$. Линейная функция достигает максимума модуля на концах: при $t=0$ это $|2|=2$, при $t=1$ это $|2-6|=4$. Итого $\rho_2 = \max\{1, 4\} = 4$.`
    },
    {
      type: "practice",
      question: String.raw`Даны функции $y_1(t) = t^2 - 2t + 1$ и $y_2(t) = -t^2 + 4$ на отрезке $[0, 2]$. Найдите расстояние 0-го порядка $\rho_0(y_1, y_2)$.`,
      options: [
        String.raw`$3.5$`,
        String.raw`$3$`,
        String.raw`$1$`,
        String.raw`$6$`
      ],
      correct: 0,
      explanation: String.raw`Составим разность $g(t) = y_1(t) - y_2(t) = (t^2 - 2t + 1) - (-t^2 + 4) = 2t^2 - 2t - 3$. Найдём критическую точку: $g'(t) = 4t - 2 = 0 \Rightarrow t = 0.5 \in [0, 2]$. Вычислим $|g(t)|$ в критической точке и на концах отрезка: при $t = 0.5$: $|2 \cdot 0.25 - 2 \cdot 0.5 - 3| = |-3.5| = 3.5$; при $t = 0$: $|-3| = 3$; при $t = 2$: $|8 - 4 - 3| = 1$. Максимум равен $\rho_0 = 3.5$.`
    },
    {
      type: "practice",
      question: String.raw`Для функций $y_1(t) = t^2 - 2t + 1$ и $y_2(t) = -t^2 + 4$ на отрезке $[0, 2]$ (где $\rho_0 = 3.5$) найдите расстояния $\rho_1$, $\rho_2$ и $\rho_5$.`,
      options: [
        String.raw`$\rho_1 = 6, \quad \rho_2 = 4, \quad \rho_5 = 0$`,
        String.raw`$\rho_1 = 3.5, \quad \rho_2 = 4, \quad \rho_5 = 6$`,
        String.raw`$\rho_1 = 6, \quad \rho_2 = 6, \quad \rho_5 = 6$`,
        String.raw`$\rho_1 = 2, \quad \rho_2 = 4, \quad \rho_5 = 4$`
      ],
      correct: 2,
      explanation: String.raw`Первые производные: $y_1'(t) = 2t - 2$, $y_2'(t) = -2t$, их разность $4t - 2$. На $[0, 2]$ максимум $|4t - 2|$ достигается при $t = 2$ и равен $6$ (при $t = 0$ равен $2$). Значит, $\rho_1 = \max\{3.5, 6\} = 6$. Вторые производные: $y_1'' = 2$, $y_2'' = -2$, модуль разности равен $|2 - (-2)| = 4$, поэтому $\rho_2 = \max\{\rho_1, 4\} = \max\{6, 4\} = 6$. Производные порядка $k \ge 3$ тождественно равны нулю, следовательно $\rho_3 = \rho_4 = \rho_5 = \dots = 6$.`
    },
    {
      type: "theory",
      question: String.raw`Пусть задана гладкая траектория $y_0(t)$ на $[t_0, T]$ и число $\varepsilon > 0$. Обозначим через $U_{\text{сильн}}(\varepsilon)$ сильную $\varepsilon$-окрестность ($n=0$), а через $U_{\text{слаб}}(\varepsilon)$ — слабую $\varepsilon$-окрестность ($n=1$). Какое утверждение верно?`,
      options: [
        String.raw`$U_{\text{сильн}}(\varepsilon) \subset U_{\text{слаб}}(\varepsilon)$, так как близость значений двух гладких функций автоматически гарантирует близость их производных.`,
        String.raw`$U_{\text{слаб}}(\varepsilon) \subset U_{\text{сильн}}(\varepsilon)$, и существуют функции из $U_{\text{сильн}}(\varepsilon)$, не лежащие в $U_{\text{слаб}}(\varepsilon)$ — например, быстро колеблющиеся вокруг $y_0(t)$ с малой амплитудой.`,
        String.raw`Ни одна из этих окрестностей не содержится в другой, поскольку $\rho_0$ и $\rho_1$ оценивают разные характеристики кривой.`,
        String.raw`$U_{\text{слаб}}(\varepsilon) \subset U_{\text{сильн}}(\varepsilon)$, причём в $U_{\text{слаб}}(\varepsilon)$ входят все функции с $|y'(t) - y_0'(t)| < \varepsilon$, независимо от величины $|y(t) - y_0(t)|$.`
      ],
      correct: 1,
      explanation: String.raw`По определению $y \in U_{\text{слаб}}(\varepsilon) \iff \rho_1(y, y_0) = \max\{\rho_0(y, y_0), \max|y' - y_0'|\} < \varepsilon$. Отсюда обязательно $\rho_0(y, y_0) < \varepsilon$, то есть $y \in U_{\text{сильн}}(\varepsilon)$, а значит $U_{\text{слаб}}(\varepsilon) \subset U_{\text{сильн}}(\varepsilon)$. Обратное неверно: пилообразная или высокочастотная кривая малой амплитуды может лежать сколь угодно близко к $y_0(t)$ по значениям (малое $\rho_0$), но иметь огромные наклоны касательных (большое $\rho_1$). Последний вариант неверен, так как $\rho_1 < \varepsilon$ требует близости и значений, и производных.`
    },
    {
      type: "practice",
      question: String.raw`Рассмотрим кривую $y_0(t) \equiv 0$ на отрезке $[0, 1]$ и возмущённую кривую $y(t) = \frac{1}{100}\sin(10000t)$. При $\varepsilon = 0.05$ определите, каким $\varepsilon$-окрестностям функции $y_0(t)$ принадлежит $y(t)$.`,
      options: [
        String.raw`Принадлежит сильной $\varepsilon$-окрестности ($\rho_0 = 0.01 < 0.05$), но не принадлежит слабой ($\rho_1 = 100 \ge 0.05$).`,
        String.raw`Принадлежит и сильной, и слабой $\varepsilon$-окрестности, так как амплитуда $\frac{1}{100}$ меньше $0.05$.`,
        String.raw`Принадлежит слабой $\varepsilon$-окрестности, но не принадлежит сильной.`,
        String.raw`Не принадлежит ни сильной, ни слабой $\varepsilon$-окрестности.`
      ],
      correct: 0,
      explanation: String.raw`Вычислим $\rho_0(y, 0) = \max_{t \in [0, 1]} \left|\frac{1}{100}\sin(10000t)\right| = \frac{1}{100} = 0.01 < 0.05$, значит $y(t)$ лежит в сильной $\varepsilon$-окрестности. Найдём производную: $y'(t) = \frac{1}{100} \cdot 10000 \cos(10000t) = 100\cos(10000t)$. Её максимум модуля на $[0, 1]$ достигается, например, при $t = 0$ и равен $100$. Следовательно, $\rho_1(y, 0) = \max\{0.01, 100\} = 100 \ge 0.05$, то есть $y(t)$ не попадает в слабую $\varepsilon$-окрестность.`
    },
    {
      type: "theory",
      question: String.raw`Функционал определяется как отображение $V: M \to \mathbb{R}$, ставящее в соответствие каждой функции $y(t)$ из некоторого класса $M$ действительное число. Какой из приведённых ниже объектов является функционалом на $M = C^1[0, T]$?`,
      options: [
        String.raw`Отображение, сопоставляющее функции $y(t)$ её производную $y'(t)$ на $[0, T]$.`,
        String.raw`Отображение, сопоставляющее моменту времени $t \in [0, T]$ мгновенную прибыль фирмы $\pi(t)$.`,
        String.raw`Отображение, сопоставляющее функции $y(t)$ множество её первообразных $\int y(t)\,dt$.`,
        String.raw`Отображение, сопоставляющее функции $y(t)$ величину $V[y] = y^2(0) + \int_0^T (y(t) + y'(t))\,dt$.`
      ],
      correct: 3,
      explanation: String.raw`Функционал должен принимать на вход функцию целиком и возвращать одно действительное число. В варианте 4 для любой фиксированной функции $y \in C^1[0, T]$ и значение $y^2(0)$, и определённый интеграл $\int_0^T (y(t) + y'(t))\,dt$ являются числами, поэтому $V[y] \in \mathbb{R}$. Варианты 1 и 3 возвращают функцию (или семейство функций), а вариант 2 принимает на вход число $t$, то есть является обычной функцией $\mathbb{R} \to \mathbb{R}$.`
    },
    {
      type: "practice",
      question: String.raw`Фирма-монополист на горизонте планирования $[0, T]$ сталкивается с динамической функцией спроса $Q_d = a - bP(t) + cP'(t)$ и функцией издержек $C(Q_s) = k Q_s$ при условии равновесия $Q_s = Q_d$. Какой функционал соответствует задаче максимизации суммарной прибыли фирмы за весь период $[0, T]$?`,
      options: [
        String.raw`$\max_{P \in \mathbb{R}} \left[(P - k)(a - bP)\right]$`,
        String.raw`$\int_0^T \left[P(t)(a - bP(t) + cP'(t)) - k(a - bP(t) + cP'(t))\right] dt \to \max_{P(t)}$`,
        String.raw`$\int_0^T \left[P(t)(a - bP(t)) - kP'(t)\right] dt \to \max_{P(t)}$`,
        String.raw`$\frac{d}{dt}\left[(P(t) - k)(a - bP(t) + cP'(t))\right] \to \max_{P(t)}$`
      ],
      correct: 1,
      explanation: String.raw`Мгновенная прибыль в момент времени $t$ равна $\pi(t) = P(t)Q_d(P(t), P'(t)) - C(Q_d(P(t), P'(t))) = P(t)(a - bP(t) + cP'(t)) - k(a - bP(t) + cP'(t))$. Чтобы получить суммарную прибыль фирмы за весь горизонт планирования $[0, T]$, мгновенную прибыль интегрируют по времени, максимизируя функционал $\int_0^T \pi(t)\,dt$ по траектории цены $P(t)$.`
    },
    {
      type: "practice",
      question: String.raw`В макроэкономической модели с потребителем максимизируется дисконтированная полезность $\int_0^T U(C(t))e^{-\delta t}\,dt \to \max$ при ограничениях $Y = C + I$, $Y = F(K, L)$ и $K' = I$. Как запишется функционал задачи после подстановки всех ограничений и исключения $C(t)$ и $I(t)$?`,
      options: [
        String.raw`$\int_0^T U(F(K, L) + K')e^{-\delta t}\,dt \to \max_{K(t), L(t)}$`,
        String.raw`$\int_0^T \left[U(F(K, L)) - K'\right]e^{-\delta t}\,dt \to \max_{K(t), L(t)}$`,
        String.raw`$\int_0^T U(F(K, L) - K')e^{-\delta t}\,dt \to \max_{K(t), L(t)}$`,
        String.raw`$\int_0^T U(K' - F(K, L))e^{\delta t}\,dt \to \max_{K(t), L(t)}$`
      ],
      correct: 2,
      explanation: String.raw`Из тождества $Y = C + I$ выражаем потребление: $C = Y - I$. Подставляя производственную функцию $Y = F(K, L)$ и уравнение накопления капитала $I = K'$, получаем $C(t) = F(K(t), L(t)) - K'(t)$. Подстановка в целевой функционал даёт $\int_0^T U(F(K, L) - K')e^{-\delta t}\,dt \to \max_{K(t), L(t)}$.`
    },
    {
      type: "theory",
      question: String.raw`Функционал $V[y]$ называется непрерывным на кривой $y_0(t)$ в смысле близости $n$-го порядка, если $\forall \varepsilon > 0\; \exists \delta(\varepsilon) > 0 : \rho_n(y, y_0) < \delta \Rightarrow |V[y] - V[y_0]| < \varepsilon$. Какое соотношение между непрерывностью 0-го и 1-го порядка верно ВСЕГДА на классе $C^1[t_0, T]$?`,
      options: [
        String.raw`Если функционал непрерывен в смысле близости 0-го порядка ($\rho_0$), то он обязательно непрерывен в смысле близости 1-го порядка ($\rho_1$), но обратное в общем случае неверно.`,
        String.raw`Если функционал непрерывен в смысле близости 1-го порядка ($\rho_1$), то он обязательно непрерывен в смысле близости 0-го порядка ($\rho_0$), но обратное в общем случае неверно.`,
        String.raw`Непрерывность в смысле $\rho_0$ и непрерывность в смысле $\rho_1$ всегда эквивалентны.`,
        String.raw`Функционал $V[y] = \int_0^1 (y'(t))^2\,dt$ непрерывен в смысле $\rho_0$, но разрывен в смысле $\rho_1$.`
      ],
      correct: 0,
      explanation: String.raw`Пусть $V$ непрерывен в смысле $\rho_0$: для любого $\varepsilon > 0$ найдётся $\delta > 0$ такое, что $\rho_0(y, y_0) < \delta \Rightarrow |V[y] - V[y_0]| < \varepsilon$. Так как $\rho_0(y, y_0) \le \rho_1(y, y_0)$, для любой функции с $\rho_1(y, y_0) < \delta$ тем более выполнено $\rho_0(y, y_0) < \delta$, а значит $|V[y] - V[y_0]| < \varepsilon$. Следовательно, непрерывность по $\rho_0$ влечёт непрерывность по $\rho_1$. Обратное неверно: например, $V[y] = \int_0^1 (y'(t))^2\,dt$ непрерывен по $\rho_1$, но разрывен по $\rho_0$ (для $y_m = \frac{1}{m}\sin(m^2 t)$ имеем $\rho_0(y_m, 0) \to 0$, но $V[y_m] \to +\infty$).`
    },
    {
      type: "theory",
      question: String.raw`Функционал $L$ на классе $M = C^1[0, 1]$ называется линейным, если $\forall c_1, c_2 \in \mathbb{R}$ и $\forall y_1, y_2 \in M$ выполняется $L[c_1 y_1 + c_2 y_2] = c_1 L[y_1] + c_2 L[y_2]$. Какой из следующих функционалов является линейным?`,
      options: [
        String.raw`$V_1[y] = \int_0^1 (t^2 y(t) + 3)\,dt$`,
        String.raw`$V_2[y] = \int_0^1 y^2(t)\,dt$`,
        String.raw`$V_3[y] = \max_{t \in [0, 1]} |y(t)|$`,
        String.raw`$V_4[y] = 2y(0) + \int_0^1 (t y(t) - 5 y'(t))\,dt$`
      ],
      correct: 3,
      explanation: String.raw`Проверим $V_4$: $V_4[c_1 y_1 + c_2 y_2] = 2(c_1 y_1(0) + c_2 y_2(0)) + \int_0^1 (t(c_1 y_1 + c_2 y_2) - 5(c_1 y_1' + c_2 y_2'))\,dt = c_1 V_4[y_1] + c_2 V_4[y_2]$ благодаря линейности вычисления в точке, дифференцирования и интегрирования. Для любого линейного функционала обязательно $L[0] = 0$, поэтому $V_1$ нелинеен ($V_1[0] = 3 \neq 0$). Функционал $V_2$ квадратичен ($V_2[cy] = c^2 V_2[y]$), а для $V_3$ нарушается однородность при отрицательных константах ($V_3[-y] = V_3[y] \neq -V_3[y]$).`
    },
    {
      type: "theory",
      question: String.raw`По определению вариации функционала приращение $\Delta V[y] = V[y + \delta y] - V[y]$ представляется в виде $\Delta V[y] = L[y, \delta y] + \beta[y, \delta y] \cdot \max|\delta y|$ (или $L[y, \delta y] + o(\delta y)$), где $\beta \to 0$ при $\max|\delta y| \to 0$. Какому требованию обязан удовлетворять функционал $L[y, \delta y]$?`,
      options: [
        String.raw`$L[y, \delta y]$ обязан быть линейным по самой траектории $y(t)$, но может быть нелинейным по вариации $\delta y(t)$.`,
        String.raw`$L[y, \delta y]$ не должен зависеть от $y(t)$, а должен зависеть исключительно от $\delta y(t)$.`,
        String.raw`$L[y, \delta y]$ обязан быть линейным функционалом по вариации $\delta y(t)$ (при фиксированной $y(t)$), тогда как зависимость от самой $y(t)$ может быть нелинейной.`,
        String.raw`Остаточный множитель $\beta[y, \delta y]$ обязан быть ненулевой константой, не зависящей от $\delta y(t)$.`
      ],
      correct: 2,
      explanation: String.raw`Вариация $\delta V = L[y, \delta y]$ — это главная линейная по приращению $\delta y(t)$ часть приращения функционала $\Delta V$ (аналог дифференциала $df = f'(x)\,dx$, который линеен по $dx$, но может нелинейно зависеть от $x$). Например, для $V[y] = \int_0^1 y^3(t)\,dt$ имеем $\delta V = \int_0^1 3y^2(t)\delta y(t)\,dt$: выражение нелинейно по $y$, но строго линейно по $\delta y$. Множитель $\beta$ обязан стремиться к $0$ при $\max|\delta y| \to 0$.`
    },
    {
      type: "practice",
      question: String.raw`Для функционала $V[y] = \int_0^1 y^2(t)\,dt$ найдите его приращение $\Delta V$ и вариацию $\delta V$.`,
      options: [
        String.raw`$\Delta V = \int_0^1 \left(2y\delta y + (\delta y)^2\right) dt, \quad \delta V = \int_0^1 2y\delta y\,dt$`,
        String.raw`$\Delta V = \int_0^1 2y\delta y\,dt, \quad \delta V = \int_0^1 (\delta y)^2\,dt$`,
        String.raw`$\Delta V = \int_0^1 (\delta y)^2\,dt, \quad \delta V = \int_0^1 2y\,dt$`,
        String.raw`$\Delta V = \int_0^1 \left(2y\delta y + (\delta y)^2\right) dt, \quad \delta V = \int_0^1 2y(t)\,dt$`
      ],
      correct: 0,
      explanation: String.raw`Дадим функции приращение $y(t) \to y(t) + \delta y(t)$: $\Delta V = \int_0^1 (y + \delta y)^2\,dt - \int_0^1 y^2\,dt = \int_0^1 (2y\delta y + (\delta y)^2)\,dt = \int_0^1 2y\delta y\,dt + \int_0^1 (\delta y)^2\,dt$. Первое слагаемое линейно по $\delta y$, а второе имеет более высокий порядок малости по $\delta y$, поэтому $\delta V = \int_0^1 2y\delta y\,dt$. Тот же результат даёт формула $\delta V = \left.\frac{d}{d\alpha} \int_0^1 (y + \alpha\delta y)^2\,dt\right|_{\alpha=0}$.`
    },
    {
      type: "practice",
      question: String.raw`Используя формулу $\delta V = \left.\frac{d}{d\alpha} V[y + \alpha\delta y]\right|_{\alpha=0}$, найдите вариацию функционала $V[y] = \int_0^T (y'(t))^2\,dt$.`,
      options: [
        String.raw`$\delta V = \int_0^T 2y'(t)\delta y(t)\,dt$`,
        String.raw`$\delta V = \int_0^T \left(2y'(t)\delta y'(t) + (\delta y'(t))^2\right) dt$`,
        String.raw`$\delta V = \int_0^T 2y''(t)\delta y'(t)\,dt$`,
        String.raw`$\delta V = \int_0^T 2y'(t)\delta y'(t)\,dt$`
      ],
      correct: 3,
      explanation: String.raw`Подставим $y + \alpha\delta y$ и учтём, что $(y + \alpha\delta y)' = y' + \alpha\delta y'$: $V[y + \alpha\delta y] = \int_0^T (y' + \alpha\delta y')^2\,dt$. Дифференцируем подынтегральное выражение по параметру $\alpha$: $\frac{d}{d\alpha}(y' + \alpha\delta y')^2 = 2(y' + \alpha\delta y')\delta y'$. Подставляя $\alpha = 0$, получаем $\delta V = \int_0^T 2y'(t)\delta y'(t)\,dt$.`
    },
    {
      type: "practice",
      question: String.raw`Найдите вариацию $\delta V$ функционала $V[y] = \int_0^T \left(y^2(t) - (y'(t))^2\right) dt$.`,
      options: [
        String.raw`$\delta V = \int_0^T \left(2y\delta y + 2y'\delta y'\right) dt$`,
        String.raw`$\delta V = \int_0^T \left(2y\delta y - 2y'\delta y'\right) dt$`,
        String.raw`$\delta V = \int_0^T (2y - 2y')\delta y\,dt$`,
        String.raw`$\delta V = \int_0^T \left(2y\delta y - 2y'\delta y' - (\delta y')^2\right) dt$`
      ],
      correct: 1,
      explanation: String.raw`Вычислим через параметр $\alpha$: $\delta V = \left.\frac{d}{d\alpha} \int_0^T \left((y + \alpha\delta y)^2 - (y' + \alpha\delta y')^2\right) dt\right|_{\alpha=0} = \left.\int_0^T \left(2(y + \alpha\delta y)\delta y - 2(y' + \alpha\delta y')\delta y'\right) dt\right|_{\alpha=0} = \int_0^T (2y\delta y - 2y'\delta y')\,dt$. Тем же путём через $\Delta V$ квадратичные члены $(\delta y)^2$ и $-(\delta y')^2$ отбрасываются как бесконечно малые более высокого порядка.`
    },
    {
      type: "practice",
      question: String.raw`Найдите вариацию $\delta V$ функционала с внеинтегральным граничным слагаемым: $V[y] = y^2(0) + \int_0^1 \left(t y(t) + (y'(t))^2\right) dt$.`,
      options: [
        String.raw`$\delta V = \int_0^1 \left(t\delta y + 2y'\delta y'\right) dt$`,
        String.raw`$\delta V = 2y(0) + \int_0^1 \left(t\delta y + 2y'\delta y'\right) dt$`,
        String.raw`$\delta V = 2y(0)\delta y(0) + \int_0^1 \left(t\delta y + 2y'\delta y'\right) dt$`,
        String.raw`$\delta V = 2y(0)\delta y(0) + \int_0^1 \left(y\delta y + 2y'\delta y'\right) dt$`
      ],
      correct: 2,
      explanation: String.raw`Заменяем $y(t)$ на $y(t) + \alpha\delta y(t)$ везде, включая значение в точке $t = 0$: $V[y + \alpha\delta y] = (y(0) + \alpha\delta y(0))^2 + \int_0^1 \left(t(y + \alpha\delta y) + (y' + \alpha\delta y')^2\right) dt$. Дифференцируя по $\alpha$ при $\alpha = 0$, получаем $\delta V = 2y(0)\delta y(0) + \int_0^1 (t\delta y + 2y'\delta y')\,dt$.`
    },
    {
      type: "practice",
      question: String.raw`Найдите вариацию $\delta V$ функционала $V[y] = \int_0^T \left(t y^3(t) + y(t)y'(t)\right) dt$ с помощью метода дифференцирования по параметру $\alpha$.`,
      options: [
        String.raw`$\delta V = \int_0^T \left((3t y^2 + y')\delta y + y\delta y'\right) dt$`,
        String.raw`$\delta V = \int_0^T \left(3t y^2\delta y + y'\delta y'\right) dt$`,
        String.raw`$\delta V = \int_0^T \left(3t y^2\delta y + y\delta y'\right) dt$`,
        String.raw`$\delta V = \int_0^T \left(3y^2\delta y + y'\delta y + y\delta y'\right) dt$`
      ],
      correct: 0,
      explanation: String.raw`Рассмотрим $V[y + \alpha\delta y] = \int_0^T \left[t(y + \alpha\delta y)^3 + (y + \alpha\delta y)(y' + \alpha\delta y')\right] dt$. Производная по $\alpha$ первого слагаемого при $\alpha = 0$ равна $3t y^2\delta y$. Для произведения по правилу дифференцирования: $\left.\frac{d}{d\alpha}(y + \alpha\delta y)(y' + \alpha\delta y')\right|_{\alpha=0} = \delta y \cdot y' + y \cdot \delta y'$. Объединяя слагаемые при $\delta y$, получаем $\delta V = \int_0^T \left((3t y^2 + y')\delta y + y\delta y'\right) dt$.`
    },
    {
      type: "theory",
      question: String.raw`В канонической задаче вариационного исчисления $\int_{t_0}^T F(t, y(t), y'(t))\,dt \to \operatorname{extr}$ заданы закреплённые граничные условия $y(t_0) = y_0$ и $y(T) = y_T$. Какому условию должна удовлетворять допустимая вариация $\delta y(t)$, чтобы возмущённая кривая $\tilde{y}(t) = y^*(t) + \delta y(t)$ оставалась допустимой?`,
      options: [
        String.raw`$\delta y(t_0) = y_0$ и $\delta y(T) = y_T$.`,
        String.raw`$\delta y(t_0) = \delta y(T) = 0$ и обязательно $\delta y'(t_0) = \delta y'(T) = 0$.`,
        String.raw`На значения $\delta y(t)$ в граничных точках $t_0$ и $T$ не накладывается никаких ограничений.`,
        String.raw`$\delta y(t_0) = 0$ и $\delta y(T) = 0$, при этом значения $\delta y'(t_0)$ и $\delta y'(T)$ могут быть ненулевыми.`
      ],
      correct: 3,
      explanation: String.raw`Поскольку и $y^*(t)$, и $\tilde{y}(t) = y^*(t) + \delta y(t)$ должны удовлетворять граничным условиям $y(t_0) = y_0$ и $y(T) = y_T$, необходимо $y^*(t_0) + \delta y(t_0) = y_0 \Rightarrow \delta y(t_0) = 0$ и $y^*(T) + \delta y(T) = y_T \Rightarrow \delta y(T) = 0$. Ограничений на наклоны касательных $y'(t_0)$ и $y'(T)$ в канонической задаче нет, поэтому $\delta y'(t_0)$ и $\delta y'(T)$ могут быть произвольными.`
    },
    {
      type: "theory",
      question: String.raw`Почему справедливо утверждение «всякий сильный экстремум функционала является слабым экстремумом», и верно ли обратное утверждение?`,
      options: [
        String.raw`Потому что сильная $\varepsilon$-окрестность содержится в слабой, поэтому знак $\Delta V$ сохраняется на более узком множестве; обратное утверждение также всегда верно.`,
        String.raw`Потому что слабая $\varepsilon$-окрестность содержится в сильной ($\rho_1 < \varepsilon \Rightarrow \rho_0 < \varepsilon$), значит неравенство для $\Delta V$, выполненное на всей сильной окрестности, автоматически выполнено на её подмножестве — слабой окрестности; обратное в общем случае неверно.`,
        String.raw`Потому что в точке сильного экстремума $\delta V = 0$, а условие $\delta V = 0$ является достаточным для слабого экстремума.`,
        String.raw`Утверждение ошибочно: на самом деле всякий слабый экстремум является сильным, так как слабая близость учитывает производные.`
      ],
      correct: 1,
      explanation: String.raw`Если $y_0(t)$ — сильный максимум, то существует $\varepsilon > 0$ такое, что $V[y] \le V[y_0]$ для всех $y$ из сильной $\varepsilon$-окрестности ($\rho_0(y, y_0) < \varepsilon$). Так как $U_{\text{слаб}}(\varepsilon) \subset U_{\text{сильн}}(\varepsilon)$, это же неравенство автоматически выполняется для всех $y$ из слабой $\varepsilon$-окрестности, то есть $y_0(t)$ является слабым максимумом. Обратное неверно: функционал может не возрастать на кривых с близкими производными, но увеличиваться на «пилообразных» кривых, близких только по $\rho_0$.`
    },
    {
      type: "theory",
      question: String.raw`В доказательстве теоремы о необходимом условии экстремума функционала ($\delta V = 0$) фиксируют кривую $y_0(t)$ и допустимую вариацию $\delta y(t)$, вводя вспомогательную функцию одной переменной $\varphi(\alpha) = V[y_0(t) + \alpha\delta y(t)]$. Какое рассуждение точно передаёт суть доказательства и логический статус теоремы?`,
      options: [
        String.raw`Если $V$ достигает экстремума на $y_0(t)$, то $\varphi(\alpha)$ достигает экстремума при $\alpha = 0$, откуда по теореме Ферма $\varphi'(0) = 0 \Rightarrow \delta V = 0$ для всех допустимых $\delta y(t)$; это условие необходимо, но не достаточно для экстремума.`,
        String.raw`Функция $\varphi(\alpha)$ достигает экстремума при $\alpha = 1$, откуда $\varphi'(1) = 0 \Rightarrow \delta V = 0$; это необходимое и достаточное условие экстремума.`,
        String.raw`Функция $\varphi(\alpha)$ всегда линейна по $\alpha$, поэтому $\varphi'(0) = 0$ возможно лишь при $\delta y(t) \equiv 0$.`,
        String.raw`Выполнение равенства $\varphi'(0) = 0$ хотя бы для одной ненулевой вариации $\delta y(t)$ гарантирует наличие сильного максимума на $y_0(t)$.`
      ],
      correct: 0,
      explanation: String.raw`При $\alpha = 0$ кривая $y_0(t) + \alpha\delta y(t)$ совпадает с $y_0(t)$, поэтому экстремум функционала на $y_0(t)$ влечёт локальный экстремум скалярной функции $\varphi(\alpha)$ в точке $\alpha = 0$. По необходимому условию экстремума функции одной переменной $\varphi'(0) = 0$. Поскольку $\varphi'(0) = \left.\frac{d}{d\alpha} V[y_0 + \alpha\delta y]\right|_{\alpha=0} = \delta V[y_0, \delta y]$, получаем $\delta V = 0$ для любой допустимой вариации $\delta y(t)$. Как и $f'(x_0) = 0$ в матанализе, это лишь необходимое, но не достаточное условие.`
    },
    {
      type: "theory",
      question: String.raw`В канонической задаче $\int_{t_0}^T F(t, y(t), y'(t))\,dt \to \operatorname{extr}$ необходимое условие экстремума сводится к уравнению Эйлера $F_y - \frac{d}{dt} F_{y'} = 0$. В чём принципиальное отличие оператора $\frac{d}{dt} F_{y'}$ от частной производной $\frac{\partial}{\partial t} F_{y'}$?`,
      options: [
        String.raw`Различия нет: $\frac{d}{dt} F_{y'}$ всегда совпадает с частной производной $F_{y't}$, поэтому уравнение Эйлера является алгебраическим.`,
        String.raw`Оператор $\frac{d}{dt} F_{y'}$ означает дифференцирование только по $y'$ при фиксированных $t$ и $y$.`,
        String.raw`$\frac{d}{dt} F_{y'}$ — полная производная по $t$ с учётом зависимости $y(t)$ и $y'(t)$ от времени: $\frac{d}{dt} F_{y'} = F_{y't} + F_{y'y} y' + F_{y'y'} y''$, поэтому в общем случае уравнение Эйлера — дифференциальное уравнение 2-го порядка.`,
        String.raw`Оператор $\frac{d}{dt} F_{y'}$ всегда приводит к дифференциальному уравнению 3-го порядка относительно $y(t)$.`
      ],
      correct: 2,
      explanation: String.raw`Выражение $F_{y'}(t, y(t), y'(t))$ зависит от $t$ как явно, так и неявно — через неизвестную функцию $y(t)$ и её производную $y'(t)$. При вычислении полной производной по правилу дифференцирования сложной функции получаем $\frac{d}{dt} F_{y'} = F_{y't} + F_{y'y} y'(t) + F_{y'y'} y''(t)$. Именно из-за члена $F_{y'y'} y''(t)$ уравнение Эйлера в общем случае является ОДУ 2-го порядка, для нахождения двух констант интегрирования которого и задаются два граничных условия $y(t_0) = y_0$ и $y(T) = y_T$.`
    },
    {
      type: "practice",
      question: String.raw`Запишите уравнение Эйлера $F_y - \frac{d}{dt} F_{y'} = 0$ для канонической задачи с функционалом $V[y] = \int_0^T \left(y^2(t) - (y'(t))^2\right) dt \to \operatorname{extr}$ при закреплённых концах $y(0) = y_0$, $y(T) = y_T$.`,
      options: [
        String.raw`$y'' - y = 0$`,
        String.raw`$y' + y = 0$`,
        String.raw`$2y - 2y' = 0$`,
        String.raw`$y'' + y = 0$`
      ],
      correct: 3,
      explanation: String.raw`Здесь подынтегральная функция равна $F(t, y, y') = y^2 - (y')^2$. Находим частные производные: $F_y = 2y$, $F_{y'} = -2y'$. Вычисляем полную производную по $t$: $\frac{d}{dt} F_{y'} = \frac{d}{dt}(-2y') = -2y''$. Подставляем в уравнение Эйлера: $F_y - \frac{d}{dt} F_{y'} = 2y - (-2y'') = 2y + 2y'' = 0$, что после деления на $2$ даёт $y'' + y = 0$.`
    },
    {
      type: "practice",
      question: String.raw`Рассмотрите каноническую задачу с интегральной частью функционала из семинара: $V[y] = \int_0^1 \left(t y(t) + (y'(t))^2\right) dt \to \operatorname{extr}$ при граничных условиях $y(0) = 0$, $y(1) = 1$. Найдите экстремаль $y^*(t)$ с помощью уравнения Эйлера.`,
      options: [
        String.raw`$y^*(t) = \frac{t^3}{6} + \frac{5}{6}t$`,
        String.raw`$y^*(t) = \frac{t^3}{12} + \frac{11}{12}t$`,
        String.raw`$y^*(t) = -\frac{t^3}{12} + \frac{13}{12}t$`,
        String.raw`$y^*(t) = \frac{t^2}{4} + \frac{3}{4}t$`
      ],
      correct: 1,
      explanation: String.raw`Для $F(t, y, y') = ty + (y')^2$ имеем $F_y = t$ и $F_{y'} = 2y'$, откуда $\frac{d}{dt} F_{y'} = 2y''$. Уравнение Эйлера принимает вид $t - 2y'' = 0 \Rightarrow y''(t) = \frac{t}{2}$. Интегрируем дважды: $y'(t) = \frac{t^2}{4} + C_1$ и $y(t) = \frac{t^3}{12} + C_1 t + C_2$. Из $y(0) = 0$ следует $C_2 = 0$; из $y(1) = 1$ получаем $\frac{1}{12} + C_1 = 1 \Rightarrow C_1 = \frac{11}{12}$. Итого $y^*(t) = \frac{t^3}{12} + \frac{11}{12}t$.`
    }
  ]
});