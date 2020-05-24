// Ive kept the initial state in here purely for simplicity, in a real world app this would be abstracted. The arrays within
// the checklist object are used as the "source" property within the application.
const initState = {
  checkLists: {
    aircraft: [
      {
        name: "Auxiliary fuel pump",
        id: 1112,
        status: false,
        engineer: 1,
        statusLabel: "done",
      },
      {
        name: "Flight controls",
        id: 2112,
        status: false,
        engineer: 1,
        statusLabel: "done",
      },
      {
        name: "Instruments and radios",
        id: 3112,
        status: false,
        engineer: 1,
        statusLabel: "done",
      },
    ],
    engineers: [
      { name: "engineer 1", id: 1999, status: false, statusLabel: "availability" },
      { name: "engineer 2", id: 2999, status: false, statusLabel: "availability" },
      { name: "engineer 3", id: 3999, status: false, statusLabel: "availability" },
    ],
  },
};

// I've tried to make the reducer as dynamic and generic as possible
// It should be able to handle any array that contains objects with the properties "id", "status", "statusLabel" and "name"
// The checklists are referred to dynamically as "listName"

const checklistReducer = (state = initState, { payload, listName, type }) => {
  switch (type) {
    case "ADD_CHECKLIST_ITEM":
      return {
        ...state,
        checkLists: {
          ...state.checkLists,
          [listName]: state.checkLists[listName].concat(payload),
        },
      };

    case "REMOVE_CHECKLIST_ITEM":
      return {
        ...state,
        checkLists: {
          ...state.checkLists,
          [listName]: state.checkLists[listName].filter(
            (item) => item.id !== payload
          ),
        },
      };

    case "TOGGLE_ITEM_STATUS":
      const toggledItem = state.checkLists[listName].map((item) => {
        if (item.id === payload) item.status = !item.status;
        return item;
      });
      return {
        ...state,
        checkLists: {
          ...state.checkLists,
          [listName]: toggledItem,
        },
      };

    // This case is specific to the Aircraft checklist
    // I need to think more on how to make "relationships" between checklists more dynamic / generic.
    case "ASSIGN_ENGINEER":
      const engineer = state.checkLists[listName].map((item) => {
        if (item.id === payload.id) item.engineer = payload.engineer;
        return item;
      });
      return {
        ...state,
        checkLists: {
          ...state.checkLists,
          [listName]: engineer,
        },
      };

    default:
      return state;
  }
};

export default checklistReducer;
