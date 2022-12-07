import React, { Component } from "react";
import { useEffect } from "react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleNewProject = this.handleNewProject.bind(this);
  }
  handleNewProject(e) {
    e.preventDefault();
    const { name } = this.state;
    console.log(name);

    // Creating New Project
    fetch("http://localhost:8080/create-dashboard", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "New Project");
        window.location.reload();
      });
  }

  // Get existing projects
  componentDidMount() {
    fetch("http://localhost:8080/get-dashboard", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        data.map((item) => {
          const projectUL = document.getElementById("project");
          const projectLI = document.createElement("li");
          projectLI.innerText = item.name;
          console.log(projectLI);
        });
        projectUL.appendChild(projectLI);
      });
  }
  render() {
    return (
      <div>
        <h1> Projects Dashboard </h1>
        <form onSubmit={this.handleNewProject}>
          <div className="mb-3">
            <label>Create New Project</label>
            <input
              type="text"
              className="form-control"
              placeholder="Project Name"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
        <br />
        <div id="project">
          <h3>List of Projects</h3>
          <ul></ul>
        </div>
      </div>
    );
  }
}
