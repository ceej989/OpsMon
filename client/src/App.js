import "./App.css";
import React from "react";

const approval = [
  { id: 1,
    departmentID: 1,
    userID: 1,
    approvedOn: 2020-01-01,
  },
];

const permission_type = [
  { id: 1, code: "GENERIC", name: "Generic"},
  { id: 2, code: "ACCESS_LEVEL", name: "Access Level"},
  { id: 3, code: "WORKFLOW_ACCESS", name: "Workflow Access"},
  { id: 4, code: "DATA_SHARING", name: "Data sharing"},
]

const permissions = [
  { id: 1, applicationId: 1, permission_type_id: 1, name: "admin" },
  { id: 2, applicationId: 1, permission_type_id: 1, name: "standard" },
  { id: 3, applicationId: 2, permission_type_id: 1, name: "admin" },
  { id: 4, applicationId: 2, permission_type_id: 1, name: "standard" },
  { id: 5, applicationId: 5, permission_type_id: 2, name: "primary" },
  { id: 6, applicationId: 5, permission_type_id: 2, name: "supervisor" },
  { id: 7, applicationId: 5, permission_type_id: 2, name: "user" },
  { id: 8, applicationId: 5, permission_type_id: 2, name: "non-user" },
  { id: 9, applicationId: 5, permission_type_id: 3, name: "read-only"},
  { id: 10, applicationId: 5, permission_type_id: 3, name: "setup_and_user"},
  { id: 11, applicationId: 5, permission_type_id: 3, name: "user"},
  { id: 12, applicationId: 5, permission_type_id: 3, name: "non-user"},
  { id: 13, applicationId: 5, permission_type_id: 4, name: "no"},
  { id: 14, applicationId: 5, permission_type_id: 4, name: "yes"},
];

const user_permissions = [
  {id: 1, userId: 1, permissionId: 1},
  {id: 2, userId: 2, permissionId: 2},
  {id: 3, userId: 1, permissionId: 6},
  {id: 4, userId: 2, permissionId: 4}
]
const riskratings = [
  { id: 1, name: "high" },
  { id: 2, name: "medium" },
  { id: 3, name: "low" },
];

const departments = [
  { id: 1, name: "itops" },
  { id: 2, name: "engineering" },
  { id: 3, name: "banking" },
  { id: 4, name: "finance" },
  { id: 5, name: "client services", code: "CS" },
  { id: 6, name: "credit", code: "CREDIT" },
  { id: 7, name: "operations", code: "BANKOPS" },
  { id: 8, name: "risk and compliance", code:"RISK" },
  { id: 9, name: "humnan resources", code: "HR" },
  { id: 10, name: "it security", code: "ITSEC" },
];

const applications = [
  //license counts as well?
  {
    id: 1,
    name: "zendesk",
    users: [{ id: 1, permission: 1 }], 
    riskrating: 1,
    totalLicenses: 30,
    activationDate: "2018-05-05",
    decommissionDate: "2019-05-05",
  },
  {
    id: 2,
    name: "carbon black",
    users: [
      { id: 1, permission: 1 },
      { id: 2, permission: 2 },
    ],
    riskrating: 3,
    totalLicenses: 200,
    activationDate: "2018-05-05",
    decommissionDate: "2999-01-01",

  },
  {
    id: 3,
    name: "office 365",
    users: [
      { id: 1, permission: 1 },
      { id: 2, permission: 2 },
    ],
    riskrating: 3,
    totalLicenses: 55,
    activationDate: "2018-06-05",
    decommissionDate: "2999-01-01",
  },
  {
    id: 4,
    name: "bitglass",
    users: [{ id: 1, permission: 1 }],
    riskrating: 3,
    totalLicenses: 50,
    activationDate: "2018-05-05",
    decommissionDate: "2019-01-01",
  },
  {
  id: 5,
  name: "sageworks",
  users: [{ id: 1, permission: 1 }],
  riskrating: 1,
  totalLicenses: 50,
  activationDate: "2018-05-05",
  decommissionDate: "2019-01-01",
},
];

const users = [
  //departments?
  {
    id: 1,
    name: "ceejay989",
    department: 1,
    isManager: true,
    password: "123",
    active: "yes",
  },
  {
    id: 2,
    name: "megathyne",
    department: 2,
    isManager: true,
    password: "123",
    active: "yes",
  },
  {
    id: 3,
    name: "epark",
    department: 1,
    isManager: false,
    password: "",
    active: "no",
  },
];

function getApplicationPermissionUserMap(applicationUserList) {
  // Creates map where the key is the permission name and the value is an array of usernames
  let map = {};

  for (let i = 0; i < applicationUserList.length; i++) {
    const permission = permissions.find(
      (f) => f.id === applicationUserList[i].permission
    );
    const pName = permission.name;

    const user = users.find((f) => f.id === applicationUserList[i].id);
    const uName = user.name;

    if (!map[pName]) {
      map[pName] = [];
    }

    map[pName].push(uName);
  }
  /* 

  map = {
    admin : ["ceej989", "megathyne"]
    viewer: ["abdul"]
  }


  map = {
    admin: ["ceej989", "megathyne"],
    viewer: ["abdul"]
  }



  */
  return map;
}

const displayApplications = applications.map((a) => {
  let record = {};

  record.id = a.id;
  record.name = a.name;
  record.users = a.users.length;
  record.roles = getApplicationPermissionUserMap(a.users);
  record.riskrating = riskratings.find((f) => f.id == a.riskrating).name;
  record.active = a.active;
  return record;
});

const displayUsers = users.map((u) => {
  return {
    name: u.name,
    active: u.active,
    applications: applications.reduce((prev, curr) => {
      const result = curr.users.filter((f) => f.id === u.id);
      if (result.length > 0) {
        prev.push({
          name: curr.name,
          permission: permissions.find((p) => p.id === result[0].permission)
            .name,
        });
        return prev;
      } else {
        return prev;
      }
    }, []),
  };
});

function App() {
  const ApplicationList = (a) => (
    <div style={{ marginRight: "50px" }}>
      ACTIVE APPLICATION LIST
      {a.map((item) => {
        if (item.active === "yes") {
          return (
            <div>
              {item.name}
              <div>Total Users:{item.users}</div>
              <div>Risk Rating: {item.riskrating}</div>
              {Object.keys(item.roles).map((key) => {
                return (
                  <div>
                    <p>
                      {key}: {item.roles[key].length}
                    </p>
                    {item.roles[key].map((m) => (
                      <p>{m}</p>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );

  const UserList = (u) => (
    <div>
      USER LIST
      {u.map((item) => {
        if (item.active === "yes") {
          return (
            <div>
              {item.name} Total Apps:{item.applications.length}
              {item.applications.map((a) => (
                <div>
                  {a.name} - {a.permission}
                </div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex" }}>
          {ApplicationList(displayApplications)}
          {UserList(displayUsers)}
        </div>
      </header>
    </div>
  );
}

export default App;
