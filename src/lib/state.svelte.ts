export let pennyCount = $state(0);

export function addPenny() {
  //   pennyCount += 1;
}

export function createPennyCounter(initial = 0) {
  let count = $state(initial);

  function inc() {
    count++;
  }

  return {
    get count() {
      return count;
    },
    inc,
  };
}

export let pennies = createPennyCounter();
