from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS

from config import Config
from models import db, Project

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(Config)

CORS(app, resources={
    r"/*": {
        "origins": [
             "http://localhost:5173",
             "http://localhost:5174",
             "http://127.0.0.1:5173",
             "http://127.0.0.1:5174",
        ]
    }
})

db.init_app(app)
migrate = Migrate(app, db)


@app.route("/")
def home():
    return jsonify({
        "message": "Portfolio API is running"
    })


# ==========================
# GET ALL PROJECTS
# ==========================
@app.route("/projects", methods=["GET"])
def get_projects():
    projects = Project.query.all()

    return jsonify([project.to_dict() for project in projects])


# ==========================
# GET ONE PROJECT
# ==========================
@app.route("/projects/<int:id>", methods=["GET"])
def get_project(id):
    project = Project.query.get_or_404(id)

    return jsonify(project.to_dict())


# ==========================
# CREATE PROJECT
# ==========================
@app.route("/projects", methods=["POST"])
def create_project():

    data = request.get_json()

    project = Project(
        title=data["title"],
        description=data["description"],
        github_link=data["github_link"],
        live_demo_link=data.get("live_demo_link")
    )

    db.session.add(project)
    db.session.commit()

    return jsonify(project.to_dict()), 201


# ==========================
# UPDATE PROJECT
# ==========================
@app.route("/projects/<int:id>", methods=["PUT"])
def update_project(id):

    project = Project.query.get_or_404(id)

    data = request.get_json()

    project.title = data.get("title", project.title)
    project.description = data.get("description", project.description)
    project.github_link = data.get("github_link", project.github_link)
    project.live_demo_link = data.get(
        "live_demo_link",
        project.live_demo_link
    )

    db.session.commit()

    return jsonify(project.to_dict())


# ==========================
# DELETE PROJECT
# ==========================
@app.route("/projects/<int:id>", methods=["DELETE"])
def delete_project(id):

    project = Project.query.get_or_404(id)

    db.session.delete(project)
    db.session.commit()

    return jsonify({
        "message": "Project deleted successfully."
    })


if __name__ == "__main__":
    app.run(debug=True)