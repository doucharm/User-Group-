import { HeaderTextInput } from "./Header_Text_Input"
import { Table_Display } from "./Components Display"
import { GroupType_Select } from "./Grouptype_Selector"


export const Card_Display = ({ group, set_display_id, actions }) => {
    return (
        <main>
            <div class="card  border-success  bg-info mb-3" >
                <div class="card-header">
                    <Get_Card_Header group={group} set_display_id={set_display_id} actions={actions} />
                </div>
                <div class="card-body">
                    Components of the group:
                    <Table_Display group={group} set_display_id={set_display_id} actions={actions} />
                </div>
            </div>
        </main>
    )
}

export const Get_Card_Header = ({ group, set_display_id, actions }) => {
    const MasterGroup = () => {
        if (group.mastergroup) {
            return (
                <button onClick={event => set_display_id(group.mastergroup.id)}>Master group </button>
            )
        } else return;
    }
    return (
        <div>
            <MasterGroup />
        <tr>
            ID: {group.id} <br />
            <HeaderTextInput group={group} actions={actions}/>
            Last change:{group.lastchange} <br />
            Group type: <GroupType_Select group={group} actions={actions}/> 
        </tr>
        </div>
    )
}

