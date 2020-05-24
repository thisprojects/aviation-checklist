export const addChecklistItem = (checkListItem, listName) => ({
  type: "ADD_CHECKLIST_ITEM",
  payload: checkListItem,
  listName,
});

export const removeChecklistItem = (checkListItemId, listName) => ({
  type: "REMOVE_CHECKLIST_ITEM",
  payload: checkListItemId,
  listName,
});

export const toggleItemStatus = (checkListItemId, listName) => ({
  type: "TOGGLE_ITEM_STATUS",
  payload: checkListItemId,
  listName,
});

export const assignEngineer = (checkListItemId, engineerId, listName) => ({
  type: "ASSIGN_ENGINEER",
  payload: { id: checkListItemId, engineer: engineerId },
  listName,
});
