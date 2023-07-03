import { useState, useEffect } from "react";
import { RewindCircleFill, RocketTakeoff, RocketTakeoffFill } from "react-bootstrap-icons";

import { v1 } from 'uuid'

// Moving subgroup button is a combination of Adding subgroup button and Delete subgroup button
// The subgroup is added to the destination group and deleted from the original group

/**
 * Component for moving a subgroup in a group to another group.
 * @param {Object} group mastergroup contain wanted subgroup
 * @param {Object} item subgroup contain it's own, mastergroup, membership ID
 * @param {Object} toggle_moving function that toggle the moving button
 * @param {Object} actions global actions
 * @returns {Component} component necessary for entering data
 */

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
/**
 * Moving_Condition function perform 2 main actions: adding a wanted subgroup to a selected group and removing it at current group
 * @param {Object} group mastergroup contain wanted subgroup
 * @param {Object} item subgroup contain it's own, mastergroup, membership ID
 * @param {Object} destination the group's ID that will receive the wanted subgroup
 * @param {Object} actions global actions
 * @return {JSX.Element}
 */
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

    const onMove = async () => {
        try {
            const fetchedItem = await actions.groupFetch(item.id); // get the wanted subgroup data
            const fetchedpayload = fetchedItem.payload // Because the information of the subgroup is wrapped inside payload, so we must use payload
            const payload_leave = {
                id: fetchedpayload.id,
                lastchange: fetchedpayload.lastchange,
                name: fetchedpayload.name,
                valid: false, // make the wanted subgroup invalid in the mastergroup
                mastergroupId: fetchedpayload.mastergroup.id,
                grouptypeId: fetchedpayload.grouptype.id
            };
            const payload_arrive = { // The moved subgroup with the new id in the destination group
                id: v1(),
                name: fetchedpayload.name,
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
                const current_role = membership?.user.roles?.filter((item) => item.group?.id === membership.group?.id && item.valid === true)?.splice(-1)[0]
                actions.membershipAsyncUpdate({
                    id: membership.id,
                    lastchange: membership.lastchange,
                    valid: false
                });
                actions.onMemberRemove({ group: { id: item.id, lastchange: item.lastchange }, membership: membership });
                if (current_role) {

                    actions.roleAsyncUpdate({ role: { ...current_role, valid: false }, membership: { ...membership, valid: false } })
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
