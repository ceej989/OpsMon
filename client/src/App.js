import "./App.css";

const permissions = [
  { id: 1, name: "admin" },
  { id: 2, name: "standard" },
];

const riskratings = [
  {id: 1, name: "high"},
  {id: 2, name: "medium"},
  {id: 3, name: "low"},
];

const applications = [
  {
    id: 1,
    name: "zendesk",
    users: [{ id: 1, permission: 1 }],
    riskrating: 1,
  },
  {
    id: 2,
    name: "carbon black",
    users: [
      { id: 1, permission: 1 },
      { id: 2, permission: 2 },
    ],
    riskrating: 3,
  },
];

const users = [
  {
    id: 1,
    name: "ceejay989",
  },
  {
    id: 2,
    name: "megathyne",
  },
];

// roles: [{ roleName: 'admin', count: 3}]
const displayApplications = applications.map((a) => {
  return {
    name: a.name,
    users: a.users.length,
    roles: a.users.reduce((prev, current) => {
      const permissionName = permissions.find(
        (f) => f.id === current.permission
      ).name;
      const username = users.find((f) => f.id === current.id).name;
      if (!prev[permissionName]) {
        prev[permissionName] = [];
        prev[permissionName].push(username);
      } else {
        prev[permissionName].push(username);
      }
      return prev;
    }, {}),
    riskrating: riskratings.find( f => f.id == a.riskrating).name,
  };
});

const displayUsers = users.map((u) => {
  let count = 0;
  // for each application
  applications.forEach((app) => {
    // for each user in that application
    app.users.forEach((au) => {
      // check if it match current user and then increment by 1
      if (au.id === u.id) count++;
    });
  });

  return {
    name: u.name,
    applications: count,
  };
});

function App() {
  const ApplicationList = (a) => (
    <div style={{ marginRight: "50px" }}>
      APPLICATION LIST
      {a.map((item) => {
        return ( 
          <div>
            {item.name} Risk Rating: {item.riskrating} Total:{item.users}
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
      })}
    </div>
  );

  const UserList = (u) => (
    <div>
      USER LIST
      {u.map((item) => (
        <div>
          {item.name} Total:{item.applications}
        </div>
      ))}
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
