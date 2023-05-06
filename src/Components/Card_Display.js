import { EnvelopeOpen } from "react-bootstrap-icons"
import { HeaderTextInput } from "./Header_Text_Input"
import { actions } from "pages/Redux Store"

export const Card_Display = ({group,set_display_id}) =>
{
    console.log(group)
    return (
        <main>
            <div class="card  border-success  bg-info mb-3" >
                <div class="card-header">
                    <Get_Card_Header group={group} />
                </div>
                <div class="card-body">
                    Components of the group:
                    <Table_Display group={group} set_display_id={set_display_id} />
                </div>
            </div>
        </main>
    )
}

export const Get_Card_Header = ({group}) => {
    return (
        <tr>
            ID: {group.id} <br />
            groupname: {group.name} <br />
            Last change:{group.lastchange} <br />
            Group type: {group.grouptype.name} <br />
        </tr>
    )
}

const Table_Display =({group,set_display_id}) =>
{
    const Get_Member_Row =({item}) =>
    {
        return (
            <tr>
                <td>{item.user.id}</td>
                <td>{item.user.name}</td>
                <td>{item.user.surname}</td>
                <td>{item.user.email}</td>
            </tr>
        )
    }
    const Get_Sub_Group_Row =({item}) =>
    {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <button onClick={event => set_display_id(item.id)}>
                    <EnvelopeOpen></EnvelopeOpen> </button>
            </tr>
        )
    }
    return (
        <div>
                        List of members:
                        <br/>
        <table className="table table-hover table-bordered table-dark table-stripped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
        
                {group?.memberships?.map(item => <Get_Member_Row item={item}/>)}
            </tbody>
        </table>
        <br />
        <br />
         List of sub-groups:
        <br />
        <table className="table table-hover table-bordered table-blue table-stripped">
    
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>

                {group?.subgroups?.map(item => <Get_Sub_Group_Row item={item}/>)}
            </tbody>
        </table>
        </div>
    )
    
}