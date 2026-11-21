window.registerTopic({
  id: "hypothesis-tests",
  title: "Тема 2. Проверка гипотез и F-тесты",
  questions: [
    {
      type: "theory",
      question: String.raw`Как записывается $F$-статистика для проверки $r$ линейных ограничений через суммы квадратов остатков $RSS_R$ и $RSS_{UR}$?`,
      options: [
        String.raw`$F = \frac{(RSS_{UR} - RSS_R)/r}{RSS_R/(n-k-1)}$`,
        String.raw`$F = \frac{(RSS_R - RSS_{UR})/r}{RSS_{UR}/(n-k-1)}$`,
        String.raw`$F = \frac{RSS_R / r}{RSS_{UR} / (n-k-1)}$`,
        String.raw`$F = \frac{(RSS_R - RSS_{UR})/(n-k-1)}{RSS_{UR}/r}$`
      ],
      correct: 1,
      explanation: String.raw`В числителе стоит прирост остаточной суммы квадратов при наложении ограничений, делённый на их число $r$; в знаменателе — оценка дисперсии ошибок неограниченной модели $RSS_{UR}/(n-k-1)$.`
    },
    {
      type: "practice",
      question: String.raw`В модели с $k = 4$ регрессорами и константой ($n = 25$) проверяются $r = 2$ ограничения. Известно, что $RSS_{UR} = 10$ и $RSS_R = 13$. Чему равна $F$-статистика?`,
      options: [
        String.raw`$F = 1.5$`,
        String.raw`$F = 3.0$`,
        String.raw`$F = 6.0$`,
        String.raw`$F = 2.5$`
      ],
      correct: 1,
      explanation: String.raw`Подставляем в формулу: $F = \frac{(13 - 10)/2}{10 / (25 - 4 - 1)} = \frac{1.5}{10/20} = \frac{1.5}{0.5} = 3.0$.`
    }
  ]
});