import { useCallback } from "react"
import { EnvelopeOpen } from "react-bootstrap-icons"

export const Table_Display = ({component,set_display_id}) =>
{
    const Get_Member_Row =({item}) =>
    {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
            </tr>
        )
    }
    const Get_Sub_Group_Row =({item,set_display_id}) =>
    {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.goal}</td>
                <td>{item.date_of_creation}</td>
                <Open_Sub_Group id={item.id} set_display_id={set_display_id} />
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
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {component.members.map(item => <Get_Member_Row item={item}/>)}
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
                    <th>Goal</th>
                    <th>Date of creation</th>
                </tr>
            </thead>
            <tbody>
                {component.sub_groups.map(item => <Get_Sub_Group_Row item={item} set_display_id={set_display_id}/>)}
            </tbody>
        </table>
        </div>
    )
    

}
const Open_Sub_Group = ({id,set_display_id}) =>
{
   
    function onOpen_SubGroup () 
    {
        set_display_id(id)
    }
    return (
        
        <div>
          <button onClick={event => set_display_id(id)}>
            <EnvelopeOpen></EnvelopeOpen>
          </button>
        </div>
      );
    
}
