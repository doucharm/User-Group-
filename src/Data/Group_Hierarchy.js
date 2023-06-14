import { Get_Node } from "./Get_Chart_Node";
import { OrganizationChart } from 'primereact/organizationchart';
export const Get_Each_Node = async (id) => {
    const get_help = async (sg) => {
      return await Get_Each_Node(sg.id);
    };
  
    const item = await Get_Node(id);
    console.log("item", item);
  
    const childrenPromises = item.subgroups?.map((sg) => get_help(sg));
    const subg = await Promise.all(childrenPromises);
    if (subg.length>0)
    {
      const data = [
        {
          label: item.name,
          children: subg,
          expanded: true
        },
      ];
      return data
    } else 
    {
      const data = [
        {
          label: item.name,
        },
      ];
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
        