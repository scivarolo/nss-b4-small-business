class Employee {
  constructor(props) {
    this.name = props.name
    this.computer = props.computer
    this.department = props.department
  }

  build() {
    return `
    <article class="employee">
      <header class="employee__name">
          <h1>${this.name}</h1>
      </header>
      <section class="employee__department">
          Works in the ${this.department}
      </section>
      <section class="employee__computer">
          Currently using a ${this.computer}
      </section>
    </article>
    `
  }

}


const employeesQuery = fetch('http://localhost:8088/employees').then(response => response.json())
const departmentsQuery = fetch('http://localhost:8088/departments').then(response => response.json())
const computersQuery = fetch('http://localhost:8088/computers').then(response => response.json())

Promise.all([employeesQuery, departmentsQuery, computersQuery])
  .then(data => {
    let employees = data[0]
    let departments = data[1]
    let computers = data[2]
    employees.forEach(employee => {
      let props = {
        name: employee.name,
        department: departments.find((dept) => dept.id === employee.departmentId).name,
        computer: computers.find(computer => computer.id === employee.computerId).name
      }
      let listing = new Employee(props)
      console.log(listing)
      let html = listing.build()
      let div = document.createElement("div")
      div.innerHTML = html
      document.querySelector(".employees").appendChild(div)
    })
  })