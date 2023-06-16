
//Sample data show what we are working with. All components are built based on this data, which will be similar to the data receive after fetching using GroupByID(id)
export const data =
{
  data: {
    groupById: {
      id: "2d9dcd22-a4a2-11ed-b9df-0242ac120003",
      name: "Uni",
      lastchange: "2023-04-19T17:27:12",
      subgroups: [
        {
          id: "2d9dced0-a4a2-11ed-b9df-0242ac120003",
          name: "Fac",
          valid: true
        }
      ],
      memberships: [
        {
          id: "7cea8596-a4a2-11ed-b9df-0242ac120003",
          lastchange: "2023-05-16T20:42:06.268940",
          valid: false,
          user: {
            membership: [
              {
                id: "7cea8596-a4a2-11ed-b9df-0242ac120003"
              }
            ],
            id: "2d9dc5ca-a4a2-11ed-b9df-0242ac120003",
            name: "John",
            surname: "Newbie",
            email: "john.newbie@world.com",
            lastchange: "2023-05-16T20:37:56.558192",
            roles: [
              {
                id: "7cea8802-a4a2-11ed-b9df-0242ac120003",
                group: {
                  id: "2d9dcd22-a4a2-11ed-b9df-0242ac120003",
                  name: "Uni"
                },
                lastchange: "2023-05-12 08:23:34.609878",
                startdate: "2023-04-19 17:27:12",
                enddate: "2023-04-19 17:27:12",
                roletype: {
                  name: "rektor",
                  nameEn: "rector"
                }
              }
            ]
          }
        },
        {
          id: "fd3f72a0-f426-11ed-acbe-0242ac120012",
          lastchange: "2023-05-16T20:19:41.301672",
          valid: true,
          user: {
            membership: [
              {
                id: "fd3f72a0-f426-11ed-acbe-0242ac120012"
              }
            ],
            id: "1234",
            name: "d",
            surname: "d",
            email: "d",
            lastchange: "2023-05-16T20:18:44.812543",
            roles: []
          }
        },
        {
          id: "23b81c38-f428-11ed-acbe-0242ac120012",
          lastchange: "2023-05-16T20:34:33.078956",
          valid: true,
          user: {
            membership: [
              {
                id: "23b81c38-f428-11ed-acbe-0242ac120012"
              },
              {
                id: "b884d672-f4b3-11ed-823d-0242ac120012"
              },
              {
                id: "3a66f5c0-f4b5-11ed-823d-0242ac120012"
              },
              {
                id: "bcd9a822-f4b5-11ed-823d-0242ac120012"
              }
            ],
            id: "123",
            name: "f",
            surname: "g",
            email: "h",
            lastchange: "2023-05-16T20:26:30.296485",
            roles: []
          }
        },
        {
          id: "506a89bc-f4bb-11ed-823d-0242ac120012",
          lastchange: "2023-05-17T14:01:26.354224",
          valid: true,
          user: {
            membership: [
              {
                id: "506a89bc-f4bb-11ed-823d-0242ac120012"
              }
            ],
            id: "50305581-f4bb-11ed-b93e-2d1aae1f3b67",
            name: "Ludv",
            surname: "Petrak",
            email: "ludvikpetrakov@gmail.com",
            lastchange: "2023-05-17T14:01:26.024789",
            roles: []
          }
        },
        {
          id: "5ea9cca4-f4bb-11ed-823d-0242ac120012",
          lastchange: "2023-05-17T14:01:50.258762",
          valid: true,
          user: {
            membership: [
              {
                id: "5ea9cca4-f4bb-11ed-823d-0242ac120012"
              }
            ],
            id: "5e7522b1-f4bb-11ed-b93e-2d1aae1f3b67",
            name: "The",
            surname: "bettas",
            email: "ludvikpetrakov@gmail.com",
            lastchange: "2023-05-17T14:01:49.954591",
            roles: []
          }
        }
      ]
    }
  }
}

