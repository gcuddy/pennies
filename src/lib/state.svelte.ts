import type { Category } from "./types";

export let pennyCount = $state(0);

export function addPenny() {
  //   pennyCount += 1;
}

function createCategoryState() {
  let categories = $state<Category[]>([]);

  function addCategory(category: string) {
    categories.push({
      category,
      activity: 0,
      budgeted: 0,
    });
  }
  let total_budgeted = $derived(
    categories.reduce((acc, curr) => +curr.budgeted + +acc, 0)
  );

  return {
    get categories() {
      return categories;
    },
    set categories(c: Category[]) {
      categories = c;
    },
    addCategory,
    total_budgeted,
  };
}

export let categoriesState = createCategoryState();

export function createPennyCounter(initial = 0) {
  let count = $state(initial);

  let incamount = $state(0);

  function inc() {
    incamount++;
    if (incamount > 6) {
      alert("That's enough pennies for today");
      return;
    }
    count++;
  }

  return {
    get count() {
      return count;
    },
    set count(n: number) {
      count = n;
    },
    inc,
  };
}

export let pennies = createPennyCounter();
