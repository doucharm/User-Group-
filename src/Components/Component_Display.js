export const Table_Display = ({component}) =>
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
    const Get_Sub_Group_Row =({item}) =>
    {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.goal}</td>
                <td>{item.date_of_creation}</td>
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
                {component.sub_groups.map(item => <Get_Sub_Group_Row item={item}/>)}
            </tbody>
        </table>
        </div>
    )
    

}