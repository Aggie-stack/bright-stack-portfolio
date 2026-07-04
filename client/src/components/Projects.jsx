import { useEffect, useState } from "react";
import "../styles.css";

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 4h6v6M20 4l-9 9M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  const [adding, setAdding] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // ===========================
  // GET PROJECTS
  // ===========================
  const fetchProjects = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/projects`);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ===========================
  // ADD / UPDATE PROJECT
  // ===========================
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setAdding(true);
    setError("");

    const projectData = {
      title,
      description,
      github_link: github,
      live_demo_link: liveDemo,
    };

    try {
      let response;

      if (editingProject) {
        response = await fetch(
          `${API_URL}/projects/${editingProject.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
          }
        );
      } else {
        response = await fetch(`${API_URL}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        });
      }

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      await fetchProjects();

      setTitle("");
      setDescription("");
      setGithub("");
      setLiveDemo("");
      setEditingProject(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }

    setAdding(false);
  };

  // ===========================
  // DELETE PROJECT
  // ===========================
  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      await fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  // ===========================
  // EDIT PROJECT
  // ===========================
  const handleEditProject = (project) => {
    setEditingProject(project);

    setTitle(project.title);
    setDescription(project.description);
    setGithub(project.github_link);
    setLiveDemo(project.live_demo_link || "");

    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);

    setTitle("");
    setDescription("");
    setGithub("");
    setLiveDemo("");

    setShowForm(false);
  };

  const handleToggleForm = () => {
    // If we're closing the form while mid-edit, clear the edit state too
    if (showForm && editingProject) {
      handleCancelEdit();
      return;
    }

    setShowForm((prev) => !prev);
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-container">

        <span className="section-eyebrow">Selected work</span>
        <h2 className="section-title">Projects</h2>

        <div className="projects-header">
          <button
            type="button"
            className="projects-title-btn"
            onClick={handleToggleForm}
          >
            {showForm ? <IconClose /> : <IconPlus />}
            {showForm
              ? "Close"
              : editingProject
              ? "Edit project"
              : "Add project"}
          </button>
        </div>

        {loading && <p className="projects-loading">Loading projects...</p>}

        {error && <p className="projects-error">{error}</p>}

        {showForm && (
          <div className="project-form-card">
            <h3 className="project-form-title">
              {editingProject ? "Edit project" : "New project"}
            </h3>

            <form
              className="project-inline-form"
              onSubmit={handleFormSubmit}
            >
              <div className="project-field full">
                <label htmlFor="project-title">Title</label>
                <input
                  id="project-title"
                  type="text"
                  placeholder="Project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="project-field full">
                <label htmlFor="project-description">Description</label>
                <textarea
                  id="project-description"
                  placeholder="What does this project do?"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  required
                />
              </div>

              <div className="project-field">
                <label htmlFor="project-github">GitHub URL</label>
                <input
                  id="project-github"
                  type="url"
                  placeholder="https://github.com/..."
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  required
                />
              </div>

              <div className="project-field">
                <label htmlFor="project-demo">Live demo URL</label>
                <input
                  id="project-demo"
                  type="url"
                  placeholder="https://..."
                  value={liveDemo}
                  onChange={(e) =>
                    setLiveDemo(e.target.value)
                  }
                />
              </div>

              <div className="project-form-actions">
                <button type="submit" className="add-btn" disabled={adding}>
                  {adding
                    ? editingProject
                      ? "Updating..."
                      : "Adding..."
                    : editingProject
                    ? "Update project"
                    : "Add project"}
                </button>

                {editingProject && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="project-grid">

          {!loading &&
            projects.length === 0 && (
              <p className="projects-empty">No projects yet.</p>
            )}

          {projects.map((project) => (

            <div
              key={project.id}
              className="project-card"
            >
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-footer">

                <div className="project-links">

                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconGithub />
                    GitHub
                  </a>

                  {project.live_demo_link && (
                    <a
                      href={project.live_demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconExternalLink />
                      Live demo
                    </a>
                  )}

                </div>

                <div className="project-actions">

                  <button
                    type="button"
                    aria-label="Edit project"
                    onClick={() =>
                      handleEditProject(project)
                    }
                  >
                    <IconEdit />
                  </button>

                  <button
                    type="button"
                    aria-label="Delete project"
                    onClick={() =>
                      handleDeleteProject(project.id)
                    }
                  >
                    <IconTrash />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      </div>
    </section>
  );
}

export default Projects;