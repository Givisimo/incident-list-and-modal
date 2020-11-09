import {
  CLOSE_INCIDENT_CARD,
  DELETE_INCIDENT,
  MODAL_DELETE_BUTTON_CLICKED,
} from '../x-550308-incident-list-modal/constants';

export const actionHandlers = {
  [MODAL_DELETE_BUTTON_CLICKED]: ({ dispatch, state }) => {
    const { sys_id } = state.properties.incidentItem;
    dispatch(DELETE_INCIDENT, { sys_id });
    dispatch(CLOSE_INCIDENT_CARD);
  },
};
