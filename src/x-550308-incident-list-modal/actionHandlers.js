import { actionTypes } from '@servicenow/ui-core';
import {
  INCIDENT_FETCH_SUCCESS,
  FETCH_LATEST_INCIDENT,
  DROPDOWN_PANEL_ITEM_CLICKED,
  nowCardActionsId,
  OPEN_INCIDENT_CARD,
  DELETE_INCIDENT,
  CLOSE_INCIDENT_CARD,
  INCIDENT_DELETE_SUCCESS,
  MODAL_DISMISSED,
} from './constants';
import { deleteIncident, getIncidents } from './httpEffects';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export const actionHandlers = {
  [COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => dispatch(FETCH_LATEST_INCIDENT),

  [FETCH_LATEST_INCIDENT]: getIncidents,

  [INCIDENT_FETCH_SUCCESS]: ({ action, updateState }) => {
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
      ? dispatch(OPEN_INCIDENT_CARD)
      : dispatch(DELETE_INCIDENT, { sys_id: clicked });
  },

  [OPEN_INCIDENT_CARD]: ({ updateState }) => updateState({ modalOpen: true }),

  [MODAL_DISMISSED]: ({ dispatch }) => dispatch(CLOSE_INCIDENT_CARD),

  [CLOSE_INCIDENT_CARD]: ({ updateState }) => updateState({ modalOpen: false }),

  [DELETE_INCIDENT]: deleteIncident,

  [INCIDENT_DELETE_SUCCESS]: ({ dispatch }) => dispatch(FETCH_LATEST_INCIDENT),
};
