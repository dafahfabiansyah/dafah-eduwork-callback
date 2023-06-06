class Table {
  constructor(init) {
    this.init = init;
  }

  createHeader(data) {
    let start = '<thead><tr>';
    let end = '</tr></thead>';
    data.forEach((d) => {
      start += `<th>${d}</th>`;
    });

    return start + end;
  }

  createBody(data) {
    let start = '<tbody>';
    let end = '</tbody>';

    data.forEach((d) => {
      start += `
      <tr>
        <td>${d[0]}</td>
        <td>${d[1]}</td>
        <td>${d[2]}</td>
        <td>${d[3]}</td>
        <td>${d[4]}</td>
      </tr>
    `;
    });

    return start + end;
  }

  render(content) {
    let table = "<table class='table table-hover text-start'>" + this.createHeader(this.init.columns) + this.createBody(this.init.data) + '</table>';
    content.innerHTML = table;
  }
}

function getData(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      cb(JSON.parse(xhr.responseText));
    }
  };
  xhr.open('get', url);
  xhr.send();
}

const table = new Table({
  columns: ['id', 'Name', 'Username', 'Email', 'Phone'],
  data: [],
});

const app = document.getElementById('app');
getData('https://jsonplaceholder.typicode.com/users', function (data) {
  table.init.data = data.map((user) => [user.id, user.name, user.username, user.email, user.phone]);
  table.render(app);
});
