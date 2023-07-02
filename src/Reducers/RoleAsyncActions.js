import { RoleQuery } from "Data/RoleQuery";
import { GroupActions, RoleActions } from "./Reducer Slice";
import { v1 } from "uuid";
import { authorizedFetch } from "Data/authorizedFetch";
// Ask for the item on server and adds it or update it in the store 
export const RoleFetchHelper = (query, selecter, dispatch, getState) => {
    const log = (text) => (p) => {
        return p
    }
    const p = query()
        .then(
            response => response.json(),
            error => error
        )
        .then(
            (i) => log('incomming')(i)
        )
        .then(
            json => log('converted')(selecter(json)),
            error => error
        )
        .then(
            json => log('dispatching')(dispatch(RoleActions.roles_update(json))),
            error => error
        )
    return p
}
// Fetch the roles from server. Finally puts the result in the store.
export const RoleFetch = () => (dispatch, getState) => {
    const selecter = (json) => json.data.roleTypePage
    const bodyfunc = async () => {
        let RoleData = await RoleFetchHelper(RoleQuery, selecter, dispatch, getState)
        console.log(RoleData)
        return RoleData
    }
    return bodyfunc()
}

// This mutation assign a membership with a new role, and after fetching it to the server, it also updates the membership that holds the new role
export const RoleAsyncInsert = (payload) => (dispatch, getState) => {
    const roleInsertJSON = (payload) => {
        return {
            query: `mutation($groupId: ID!, $userId: ID!, $roletypeID: ID!,$id: ID!) {
            roleInsert(role: {
            id: $id,
            groupId: $groupId,
            userId: $userId,
            roletypeId: $roletypeID
            valid:true
        }){
            msg
            role {
                lastchange
                id
                startdate
                enddate
                roletype {
                  id
                  nameEn
                }
                group
                {
                    id
                }
                valid
              }
        }
        }`,
            variables:      { id:v1(), 
                              groupId:payload.membership.group.id,
                              userId:payload.membership.user.id,
                              roletypeID:payload.role.id
                            }
        }
    }


    authorizedFetch('/gql',{body: JSON.stringify(roleInsertJSON(payload))})
    .then((resp) => resp.json())
        .then((json) => {
            const msg = json.data?.roleInsert?.msg;
            if (msg === "fail") {
                console.log("Update failed");
            } else {
                const new_role = json.data?.roleInsert?.role;
                const new_user={...payload.membership.user,roles : payload.membership.user.roles.concat(new_role) }
                const new_membership={...payload.membership,user:new_user}
                console.log("new membership going into store",new_membership)
                dispatch(GroupActions.memberUpdate({membership:new_membership,group:{id:new_membership.group.id}}))
            }
            return json;
        })
        .catch(() => console.log("Failed to insert"));
}

// This mutation will update a role and fetch it to server, it'll help when you want to change the role of a membership
const roleMutationJSON = (role) => {
  console.log("role in", role)
  const { enddate, ...restPayload } = role;
  return {
    query: `
      mutation($id: ID!, $lastchange: DateTime!, $valid: Boolean!, $enddate: DateTime) {
        roleUpdate(role: {
          id: $id,
          lastchange: $lastchange,
          valid: $valid,
          enddate: $enddate
        }) {
          msg
          role {
            id
            lastchange
            valid
            roletype {
              id
              nameEn
            }
            startdate
            enddate
            group
            {
              id
            }
          }
        }
      }
    `,
    variables: {
      ...restPayload,
      enddate: enddate || null,
    },
  };
};

export const RoleAsyncUpdate = ({role,membership}) =>  (dispatch, getState) => 
{

  authorizedFetch('/gql',{body: JSON.stringify(roleMutationJSON(role))})
    .then(resp => resp.json())
    .then(
        json => {
            const msg = json.data.roleUpdate.msg
            if (msg === "fail") {
                console.log("Update failed")
            } else {
                const new_updated_role=json.data.roleUpdate?.role
                const updated_rolelist=membership.user?.roles?.map(r => r.id===new_updated_role.id ? new_updated_role : r)
                const updated_membership={...membership,user:{...membership.user,roles:updated_rolelist}}
                dispatch(GroupActions.memberUpdate({membership:updated_membership,group:{id:updated_membership.group.id}}))
            }
        }
    )
}
// Mutation to insert a new role into roletype page, we're not using it at the moment. This is for further developement
const roletypeInsertJSON = (roletype) => {
  return {
      query: `mutation($id: ID!, $name: String!, $nameEn: String!) {
        roleTypeInsert(roleType: {
        id: $id,
        name:$name,
        nameEn: $nameEn
    }){
        msg
        id
        roleType
        {
          id
          name
          nameEn
        }
    }
    }`,
      variables: roletype
      }
  }

export const Role_Type_Insert = (payload) => 
{
  authorizedFetch('/gql',{body: JSON.stringify(roletypeInsertJSON(payload))})
}
