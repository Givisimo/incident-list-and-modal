import { Fragment } from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-template-card';
import '../custom-modal';

export default (
  { incidents, modalOpen, incidentItem },
  { updateState, dispatch },
) => {
  return (
    <Fragment>
      {modalOpen ? (
        <custom-modal modalOpen={modalOpen} incidentItem={incidentItem} />
      ) : null}

      <ul className="container">
        {incidents.map(item => {
          const {
            sys_id,
            short_description,
            sys_updated_on: updated_on,
            state,
            assignment_group,
            assigned_to,
            number,
          } = item;

          const { display_value } = assignment_group;
          const { display_value: display_name } = assigned_to;

          return (
            <li className="list-item" key={sys_id}>
              <now-template-card-assist
                tagline={{ icon: 'tree-view-long-outline', label: 'Incident' }}
                actions={[
                  { id: 'open', label: 'Open Record' },
                  { id: 'delete', label: 'Delete' },
                ]}
                heading={{ label: short_description }}
                content={[
                  { label: 'Number', value: { type: 'string', value: number } },
                  { label: 'State', value: { type: 'string', value: state } },
                  {
                    label: 'Assignment Group',
                    value: {
                      type: 'string',
                      value: display_value,
                    },
                  },
                  {
                    label: 'Assigned To',
                    value: { type: 'string', value: display_name },
                  },
                ]}
                contentItemMinWidth="300"
                footerContent={{ label: 'Updated', value: updated_on }}
                configAria={{}}
                on-click={() => updateState({ clicked: sys_id })}
              />
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};
