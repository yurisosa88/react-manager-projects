import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState,setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(task) {
    setProjectState( prevProjectState => {
      const newTask = {
        taskName: task,
        projectId: prevProjectState.selectedProjectId,
        id: Math.random()
      }
      return {
        ...prevProjectState,
        tasks: [...prevProjectState.tasks,newTask]
      }
    });
  }

  function handleDeleteTask(taskId) {
    setProjectState( prevProjectState => {
      return {
        ...prevProjectState,
        tasks: prevProjectState.tasks.filter( 
          task => task.id !== taskId)
      }
    })
  }

  function handdleStartAddProject(){
    setProjectState( prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: null
      }
    });
  }

  function handleAddProject(newProjectData) {
    setProjectState( prevProjectState => {
      const newProject = {
        ...newProjectData,
        id: Math.random()
      }
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects,newProject]
      }
    });
  }

  function handleCancelAddProject(){
    setProjectState( prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined
      }
    });
  }

  function handleSelectedProject(selectedId) {
    setProjectState( prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: selectedId
      }
    });
  }

  function hanbdleDeleteProjet() {
    setProjectState( prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        //projects: prevProjectState.projects.filter( project => project.id !== projectId )
        projects: prevProjectState.projects.filter( 
          project => project.id !== prevProjectState.selectedProjectId)
      }
    })
  }

  let content;

  if(projectState.selectedProjectId === null) {
    content = <NewProject 
    onCancel={handleCancelAddProject} 
    onAddProject={handleAddProject} />
  } else if(projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handdleStartAddProject} />
  } else if(projectState.selectedProjectId) {
    const project = projectState.projects.find( (project) => project.id === projectState.selectedProjectId );
    content = <SelectedProject 
    onDeleteProject={hanbdleDeleteProjet} 
    project={project} 
    onAddTask={handleAddTask} 
    onDeleteTask={handleDeleteTask} 
    tasks={projectState.tasks} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
      selectedProject={handleSelectedProject} 
      projects={projectState.projects} 
      onStartAddProject={handdleStartAddProject} 
      selectedProjectId={projectState.selectedProjectId} />
      {/* {projectState.selectedProjectId === null ? 
      <NewProject onCancel={onHideNewComponent} /> : 
      <NoProjectSelected onStartAddProject={handdleStartAddProject} /> } */}
      {content}
    </main>
  );
}

export default App;
