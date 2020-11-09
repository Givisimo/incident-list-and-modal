import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import { actionHandlers } from './actionHandlers';

createCustomElement('x-550308-incident-list-modal', {
  renderer: { type: snabbdom },
  view,
  styles,
  initialState: {
    incidents: [],
    clicked: '',
    incidentItem: '',
    modalOpen: false,
  },
  actionHandlers: actionHandlers,
});
