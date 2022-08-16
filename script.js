// dom elements ------------------------------------------------

const addCounter = document.getElementById("add-counter");
const counterContainer = document.getElementById("counter-container");
const resetCounter = document.getElementById("reset");
// Action identifiers----------------------------------------------
const ADD = "add";
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";
const initialState = [
  {
    id: 1,
    value: 0,
    increment: `increment-${1}`,
    decrement: `decrement-${1}`,
  },
];
//  action creator -----------

const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};
const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};
const add = (value) => {
  return {
    type: ADD,
    payload: value,
  };
};
const reset = (value) => {
  return {
    type: RESET,
    payload: value,
  };
};
// action reducer -------------------------
const addCounterReducer = (state = initialState, action) => {
  console.log({ action: action.type });
  switch (action.type) {
    case ADD:
      const len = state.length;
      return [
        ...state,
        {
          id: state[len - 1].id + 1,
          value: 0,
          increment: `increment-${state[len - 1].id + 1}`,
          decrement: `decrement-${state[len - 1].id + 1}`,
        },
      ];
    case RESET:
      console.log({ state });
      return state.map((value) => ({ ...value, value: 0 }));

    case INCREMENT:
      const updatedIn = state.find((i) => i.increment === action.payload.id);
      if (updatedIn) {
        updatedIn.value = updatedIn.value + action.payload.count;
      }
    case DECREMENT:
      const updatedDe = state.find((i) => i.decrement === action.payload.id);
      if (updatedDe) {
        updatedDe.value = updatedDe.value - action.payload.count;
      }

    default:
      return state;
  }
};
const store = Redux.createStore(addCounterReducer);

const reRender = () => {
  console.log(initialState);
  counterContainer.innerHTML = ``;
  const state = store.getState();

  state.forEach((element) => {
    const item = `
    <div
    class="p-4 counter h-auto flex flex-col items-center justify-center space-y-5 my-5 bg-white rounded shadow">
    <div class="text-2xl font-semibold">${element.value}</div>
    <div class="flex space-x-3">
        <button class="bg-indigo-400 text-white px-3 py-2 rounded shadow" data-id="${element.id}" id=${element.increment}>
            Increment
        </button>
        <button class="bg-red-400 text-white px-3 py-2 rounded shadow" id=${element.decrement}>
            Decrement
        </button>
    </div>
</div>
    `;
    counterContainer.insertAdjacentHTML("beforeend", item);
  });
  const counterCard = counterContainer.querySelectorAll(".counter");
  counterCard.forEach((e, index) => {
    e.querySelector(`#increment-${index + 1}`)?.addEventListener(
      "click",
      () => {
        const contentId = `increment-${index + 1}`;
        store.dispatch(
          increment({
            id: contentId,
            count: index + 1,
          })
        );
      }
    );
    e.querySelector(`#decrement-${index + 1}`)?.addEventListener(
      "click",
      () => {
        const contentId = `decrement-${index + 1}`;
        store.dispatch(
          decrement({
            id: contentId,
            count: index + 1,
          })
        );
      }
    );
  });
};
reRender();
store.subscribe(reRender);
addCounter.addEventListener("click", () => {
  store.dispatch(add());
});
resetCounter.addEventListener("click", () => {
  console.log("addd");
  store.dispatch(reset());
});
