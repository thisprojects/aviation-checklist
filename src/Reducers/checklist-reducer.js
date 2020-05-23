const initState = {
  checkLists: {
    aviation: [
      {
        name: "Checklist Item 1",
        id: 1,
        status: false,
        engineer: 1,
      },
      {
        name: "Checklist Item 2",
        id: 2,
        status: false,
        engineer: 1,
      },
      {
        name: "Checklist Item 3",
        id: 3,
        status: false,
        engineer: 1,
      },
    ],
    engineers: [
      { name: "engineer 1", id: 1 },
      { name: "engineer 2", id: 2 },
      { name: "engineer 3", id: 3 },
    ],
  },
};

const checklistReducer = (state = initState, { payload, listName, type }) => {
  console.log(state)
  switch (type) {

    case "ADD_CHECKLIST_ITEM":
      return {
        ...state,
        checkLists: { ...state.checkLists, [listName]: state.checkLists[listName].concat(payload) },
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
