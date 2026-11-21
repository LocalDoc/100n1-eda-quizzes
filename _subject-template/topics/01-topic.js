window.registerTopic({
  id: "ols-basics",
  title: "Тема 1. МНК и теорема Гаусса–Маркова",
  questions: [
    {
      type: "theory",
      question: String.raw`Какое условие выражает предпосылку о гомоскедастичности и отсутствии автокорреляции ошибок в матричной форме для модели $Y = X\beta + u$?`,
      options: [
        String.raw`$E(u \mid X) = \mathbf{0}$`,
        String.raw`$\text{Var}(u \mid X) = \sigma^2 I_n$`,
        String.raw`$\text{Var}(u \mid X) = \sigma^2 (X'X)^{-1}$`,
        String.raw`$\text{rank}(X) = k + 1$`
      ],
      correct: 1,
      explanation: String.raw`Диагональность $\sigma^2 I_n$ означает нулевые ковариации между ошибками разных наблюдений, а одинаковые элементы $\sigma^2$ на главной диагонали — постоянство дисперсии.`
    },
    {
      type: "practice",
      question: String.raw`В регрессии с константой и тремя регрессорами ($k = 3$), оценённой по $n = 54$ наблюдениям, $RSS = 200$, а элемент $[(X'X)^{-1}]_{22} = 0.25$. Найдите $s^2$ и стандартную ошибку $se(\hat{\beta}_1)$.`,
      options: [
        String.raw`$s^2 = 4.0;\; se(\hat{\beta}_1) = 1.0$`,
        String.raw`$s^2 = 3.92;\; se(\hat{\beta}_1) = 0.99$`,
        String.raw`$s^2 = 4.0;\; se(\hat{\beta}_1) = 0.5$`,
        String.raw`$s^2 = 50.0;\; se(\hat{\beta}_1) = 3.54$`
      ],
      correct: 0,
      explanation: String.raw`Число степеней свободы: $n - k - 1 = 54 - 3 - 1 = 50$. Тогда $s^2 = \frac{200}{50} = 4.0$, а $se(\hat{\beta}_1) = \sqrt{s^2 \cdot [(X'X)^{-1}]_{22}} = \sqrt{4.0 \cdot 0.25} = 1.0$.`
    }
  ]
});