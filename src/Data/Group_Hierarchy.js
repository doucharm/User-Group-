import { Get_Node } from "./Get_Chart_Node";
import { OrganizationChart } from 'primereact/organizationchart';
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
        className: 'bg-indigo-500 text-white',
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
          className: 'bg-blue-500 text-white',
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
          className: 'bg-green-500 text-white',
          style: { borderRadius: '12px' },
        }
      return data
    }
    
  
   
  };
  

export const Get_Hierarchy = async () =>
{
    const hie=await Get_Each_Node("2d9dcd22-a4a2-11ed-b9df-0242ac120003")
    console.log("hie called and result ",hie)
    return hie

}
export const Draw_Chart =async (hie) =>
{
    return (
        <div className="card overflow-x-auto">
            <OrganizationChart value={hie} />
        </div>
    )
}
        