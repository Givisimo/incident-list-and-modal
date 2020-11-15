import { actionTypes } from '@servicenow/ui-core';
import {
  INCIDENT_FETCH_SUCCEEDED,
  FETCH_LATEST_INCIDENT_STARTED,
  DROPDOWN_PANEL_ITEM_CLICKED,
  nowCardActionsId,
  INCIDENT_CARD_OPENED,
  INCIDENT_DELETE_STARTED,
  INCIDENT_CARD_CLOSED,
  INCIDENT_DELETE_SUCCEEDED,
  MODAL_DISMISSED,
} from './constants';
import { deleteIncident, getIncidents } from './httpEffects';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export const actionHandlers = {
  [COMPONENT_BOOTSTRAPPED]: ({ dispatch }) =>
    dispatch(FETCH_LATEST_INCIDENT_STARTED),

  [FETCH_LATEST_INCIDENT_STARTED]: getIncidents,

  [INCIDENT_FETCH_SUCCEEDED]: ({ action, updateState }) => {
    const { result } = action.payload;
    updateState({ incidents: result });
  },

  [DROPDOWN_PANEL_ITEM_CLICKED]: ({ action, state, dispatch, updateState }) => {
    const { incidents, clicked } = state;
    const { payload } = action;
    updateState({
      incidentItem: incidents.find(({ sys_id }) => sys_id === clicked),
    });
    payload.item.id === nowCardActionsId.open
      ? dispatch(INCIDENT_CARD_OPENED)
      : dispatch(INCIDENT_DELETE_STARTED, { sys_id: clicked });
  },

  [INCIDENT_CARD_OPENED]: ({ updateState }) => updateState({ modalOpen: true }),

  [MODAL_DISMISSED]: ({ dispatch }) => dispatch(INCIDENT_CARD_CLOSED),

  [INCIDENT_CARD_CLOSED]: ({ updateState }) =>
    updateState({ modalOpen: false }),

  [INCIDENT_DELETE_STARTED]: deleteIncident,

  [INCIDENT_DELETE_SUCCEEDED]: ({ dispatch }) =>
    dispatch(FETCH_LATEST_INCIDENT_STARTED),
};
