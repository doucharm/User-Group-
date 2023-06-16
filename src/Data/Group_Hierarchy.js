import { Get_Node } from "./Get_Chart_Node";
import { OrganizationChart } from 'primereact/organizationchart';
import { useSelector } from "react-redux";
import './Hierarchy_Chart.css'
export const Get_Each_Node = async (id) => {
    const get_help = async (sg) => {
      return await Get_Each_Node(sg.id);
    };
    const item = await Get_Node(id);
    const childrenPromises = item.subgroups?.map((sg) => get_help(sg));
    const all_children = await Promise.all(childrenPromises);
    const Get_Label_Member = (m) =>
    {
      return (
      { 

        data:{
          name: `${m.user.name} ${m.user.surname}`, 
          email: m.user.email
            },
        type: 'member',
        className: 'member',
        style: { borderRadius: '12px' },
      }
    )
    }
    const members_label = item.memberships.filter(m => m.valid).map(Get_Label_Member);
    all_children.push(...members_label)
    if (all_children.length>0)
    {
      const data = 
        {
          children: all_children,
          expanded: true,
          data:
          {
            name:item.name,
            type:item.grouptype.nameEn
          },
          type:"group",
          className: 'group',
          style: { borderRadius: '12px' },
        }
      
      return data
    } 
    else 
    {
      const data = 
        {

          data:
          {
            name:item.name,
            type:item.grouptype.nameEn
          },
          type:"group",
          className: 'endgroup',
          style: { borderRadius: '12px' },
        }
      return data
    }
  };
  

export const Get_Hierarchy = async () =>
{
    const hie=await Get_Each_Node("2d9dcd22-a4a2-11ed-b9df-0242ac120003")
    return hie
}
export const Get_Chart = (show_chart) =>
{
    const hierarchy=useSelector(state => state.hierarchy)
    const hierarchy_list=[hierarchy]
if ( show_chart && hierarchy_list[0] )
  {
      const nodeTemplate = (node) => {
          if (node.type === 'member') 
          {
              return (
                  <div className="flex flex-column">
                      <div className="flex flex-column align-items-center">
                          <span className="font-bold mb-2">{node.data.name}</span>
                          <br />
                          <span>{node.data.email}</span>
                      </div>
                  </div>
              );
          }
          else if (node.type === 'group') 
          {
              return (
                  <div className="flex flex-column">
                      <div className="flex flex-column align-items-center">
                          <span className="font-bold mb-2">{node.data.name}</span>
                          <br />
                          <span>{node.data.type}</span>
                      </div>
                  </div>
              );
          }
      };
      return (
        <div className="organizationchart-demo">
            <div className="card">
                <OrganizationChart value={hierarchy_list} nodeTemplate={nodeTemplate} className="company"></OrganizationChart>
            </div>
        </div>
    )
  }

 else if ( !show_chart )
 {
  return ;
 } else
 {
 return ("No chart available");
 }
}
        