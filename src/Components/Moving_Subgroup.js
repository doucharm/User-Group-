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

    const onMove = async () => {
        try {
            const fetchedItem = await actions.groupFetch(item.id);
            console.log("Item information:", fetchedItem);
            const fetchedpayload = fetchedItem.payload
            const payload_leave = {
                id: item.id,
                lastchange: item.lastchange,
                name: item.name,
                valid: false,
                mastergroupId: item.mastergroup.id
            };

            console.log("Member subgroup:", fetchedpayload.memberships);

            const payload_arrive = {
                id: v1(),
                name: item.name,
                mastergroupId: destination,
            };
            const new_sub = {
                group: destinationGroup,
                new_subgroup: payload_arrive
            }

            console.log("payload leave", payload_leave);
            console.log("payload arrive", new_sub);

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
                        console.log(new_subgroup)
                        actions.onAddSubGroup({group:destinationGroup.payload,new_subgroup:new_subgroup}) //Insert the new subgroup in store
                    }
                    return json
                }
            ) 
            actions.groupAsyncUpdate(payload_leave);
            actions.onGroupDelete({ group, item });
            fetchedpayload.memberships.forEach((membership) => {
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
