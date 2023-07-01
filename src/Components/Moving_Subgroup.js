import { useState, useEffect } from "react";
import { RewindCircleFill, RocketTakeoff, RocketTakeoffFill } from "react-bootstrap-icons";

import { v1 } from 'uuid'

// Moving subgroup button is a combination of Adding subgroup button and Delete subgroup button
// The subgroup is added to the destination group and deleted from the original group

export const Moving_Subgroup = ({ group, item, actions, toggle_moving }) => {
    const [destination, set_destination] = useState("");

    const onInputChange = (e) => {
        set_destination(e.target.value);
    };

    return (
        <>
            <input className="form-control-warning" onChange={onInputChange} placeholder="Enter destination group's ID" />
            <button onClick={toggle_moving}>
                <RewindCircleFill />
            </button>
            <Moving_Condition group={group} item={item} actions={actions} destination={destination} />
        </>
    );
};

export const Moving_Condition = ({ group, item, actions, destination }) => {
    const [destinationGroup, set_destinationGroup] = useState(null);

    useEffect(() => {

        const getDestinationGroup = () => {
            actions.groupFetch(destination) //get the destination group data
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

    const onMove = async () => {
        try {
            const fetchedItem = await actions.groupFetch(item.id); // get the wanted subgroup data
            const fetchedpayload = fetchedItem.payload // Because the information of the subgroup is wrapped inside payload, so we must use payload
            const payload_leave = {
                id: item.id,
                lastchange: item.lastchange,
                name: item.name,
                valid: false,
                mastergroupId: item.mastergroup.id,
                grouptypeId: item.grouptype.id
            };

            console.log("Member subgroup:", fetchedpayload.memberships);

            const payload_arrive = { // The moved subgroup with the new id in the destination group
                id: v1(),
                name: item.name,
                mastergroupId: destination,
            };

            actions.groupAsyncInsert(payload_arrive)
                .then(
                    resp => resp.json()
                )
                .then(
                    json => {
                        const msg = json.data.groupInsert.msg
                        if (msg === "fail") {
                            console.log("Update failed")
                        } else {
                            const new_subgroup = json.data.groupInsert.group
                            actions.onAddSubGroup({ group: destinationGroup.payload, new_subgroup: new_subgroup }) //Insert the new subgroup in store
                        }
                        return json
                    }
                )
            actions.groupAsyncUpdate(payload_leave);
            actions.onGroupDelete({ group, item });
            fetchedpayload.memberships.forEach((membership) => { //Moving subgroup button also remove all the membership and role inside it
                const current_role = membership?.user.roles?.filter((item) => item.group?.id === membership.group?.id && item.valid === true)
                const old_role = current_role[current_role.length - 1]
                actions.membershipAsyncUpdate({
                    id: membership.id,
                    lastchange: membership.lastchange,
                    valid: false
                });
                actions.onMemberRemove({ group: { id: item.id, lastchange: item.lastchange }, membership: membership });
                if (old_role) {
                    actions.roleAsyncUpdate(old_role)
                }
            });
        } catch (error) {
            console.error("Error fetching item information:", error);
        }
    };
    return (
        <button onClick={onMove}>
            <RocketTakeoff />
        </button>
    )
}

export const Moving_Subgroup_Button = ({ group, subgroup, actions }) => { // Two state moving subgroup button
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
