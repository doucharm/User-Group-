import { useState, useEffect } from "react";
import { RewindCircleFill, RocketTakeoff, RocketTakeoffFill } from "react-bootstrap-icons";

import { v1 } from 'uuid'

export const Moving_Subgroup = ({ group, item, actions, toggle_moving }) => {
    const [destination, set_destination] = useState("");
    const [destinationGroup, set_destinationGroup] = useState(null);

    const onInputChange = (e) => {
        set_destination(e.target.value);
    };

    useEffect(() => {

        const getDestinationGroup = () => {
            actions.groupFetch(destination)
                .then((groupData) => {
                    set_destinationGroup(groupData);
                })
                .catch((error) => {
                    console.error("Error fetching destination group:", error);
                });
        };

        if (destination) {
            getDestinationGroup();
        } else {
            set_destinationGroup(null);
        }
    }, [destination]);
    console.log('destinategroup', destinationGroup)

    const onMove = () => {
        const payload_leave = {
            id: item.id,
            lastchange: item.lastchange,
            name: item.name,
            valid: false,
            mastergroupId: item.mastergroup.id
        };

        const payload_arrive = {
            id: v1(),
            name: item.name,
            mastergroupId: destination,
        };
        const new_sub = {
            group: destinationGroup,
            new_subgroup: payload_arrive
        }
        /*const new_payload = {
            id: item.id,
            lastchange: new Date().toISOString(),
            name: item.name,
            valid: true,
            mastergroupId: destination
        }*/

        //console.log("payload arrive", new_payload);
        console.log("payload leave", payload_leave);
        console.log("payload arrive", new_sub);

        actions.onAddSubGroup(new_sub);
        actions.groupAsyncInsert(payload_arrive)
        //actions.groupAsyncUpdate(new_payload)
        actions.groupAsyncUpdate(payload_leave);
        /*actions.membershipAsyncUpdate({
            id: item.memberships?.id,
            lastchange: item.memberships?.lastchange,
            valid: false
        })*/
        actions.onGroupDelete({ group, item });

    };

    return (
        <>
            <input className="form-control-warning" onChange={onInputChange} placeholder="Enter destination group's ID" />
            <button onClick={toggle_moving}>
                <RewindCircleFill />
            </button>
            <button onClick={onMove}>
                <RocketTakeoff />
            </button>
        </>
    );
};

export const Moving_Subgroup_Button = ({ group, subgroup, actions }) => {
    const [moving, set_moving] = useState(false);

    if (!moving) {
        return (
            <button onClick={event => set_moving(true)}>
                <RocketTakeoffFill />
            </button>
        );
    } else {
        return <Moving_Subgroup group={group} item={subgroup} actions={actions} toggle_moving={event => set_moving(false)} />;
    }
};
