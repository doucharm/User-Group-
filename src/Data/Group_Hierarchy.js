import React, { useState ,useEffect} from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { Get_Node } from './Get_Chart_Node';
export const Get_Hierarchy = async (id) =>
{
    console.log("id going into get_hierarchy", id)
    const item=await Get_Node(id)
    console.log("item",item)
    const data=[
        {
            label: item.name,
            expanded: true,
            children: item.subgroups?.map(sg => Get_Hierarchy(sg.id))
            

        }
    ];
    console.log("hierarchy",data)
    return data
}


        