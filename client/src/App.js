import "./App.css";
import React from "react";

const permissions = [
  { id: 1, name: "admin" },
  { id: 2, name: "standard" },
];

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
  { id: 5, name: "client services" },
  { id: 6, name: "credit" },
  { id: 7, name: "operations" },
  { id: 8, name: "risk and compliance" },
  { id: 9, name: "hr" },
  { id: 10, name: "it security" },
];

const applications = [
  //license counts as well?
  {
    id: 1,
    name: "zendesk",
    users: [{ id: 1, permission: 1 }],
    riskrating: 1,
    totalLicenses: 30,
    active: "yes",
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
    active: "yes",
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
    active: "yes",
  },
  {
    id: 4,
    name: "bitglass",
    users: [{ id: 1, permission: 1 }],
    riskrating: 3,
    totalLicenses: 50,
    active: "no",
  },
];

const users = [
  //departments?
  {
    id: 1,
    name: "ceejay989",
    department: 1,
    active: "yes",
  },
  {
    id: 2,
    name: "megathyne",
    department: 2,
    active: "yes",
  },
  {
    id: 3,
    name: "epark",
    department: 1,
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
