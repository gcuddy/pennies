import type { Category } from "./types";

export let pennyCount = $state(0);

class LaborPower {
  isSellingLaborPower = $state(false);
}
export let isSellingLaborPower = new LaborPower();

export function addPenny() {
  //   pennyCount += 1;
}

function createCategoryState() {
  let categories = $state<Category[]>([
    {
      category: "Food",
      activity: 0,
      budgeted: 0,
    },
    {
      category: "Rent",
      activity: 0,
      budgeted: 0,
    },
  ]);

  function addCategory(category: string) {
    categories.push({
      category,
      activity: 0,
      budgeted: 0,
    });
  }

  //   let total_budgeted = $derived(
  //     categories.reduce((acc, { budgeted }) => +acc + +budgeted, 0)
  //   );

  function total_budgeted() {
    return categories.reduce((acc, { budgeted }) => +acc + +budgeted, 0);
  }

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
