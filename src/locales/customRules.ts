export function customRuRule(choice: number) {
  if (choice === 0) {
    return 0;
  }

  const endsWithOne = choice % 10 === 1 && choice !== 11 && choice < 2000;
  const endsWithFew =
    (choice % 10 === 2 || choice % 10 === 3 || choice % 10 === 4) &&
    (choice < 10 || choice > 20) &&
    choice < 2000;

  if (endsWithOne) {
    return 1;
  }

  if (endsWithFew) {
    return 2;
  }

  return 3;
}

export function customRule(choice: number) {
  if (choice === 0) {
    return 0;
  }

  return choice === 1 ? 1 : 2;
}
