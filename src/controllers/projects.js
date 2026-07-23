/* import { getAllProjects } from '../models/projects.js';


// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};  

// Export any controller functions
export { showProjectsPage }; */

/* import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

// 1. Constante para limitar a 5 proyectos
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// 2. Controlador actualizado para mostrar solo los próximos 5 proyectos
const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        const title = 'Upcoming Service Projects'; // Título actualizado según la rúbrica

        res.render('projects', { title, projects });
    } catch (error) {
        next(error); // Pasa el error al manejador global
    }
};  

// 3. Nuevo controlador para los detalles de un proyecto individual
const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id; // Extrae el ID de la URL (/project/:id)
        const project = await getProjectDetails(projectId);
        
        // Si el proyecto no existe en la base de datos, lanzamos un 404
        if (!project) {
            const error = new Error('Service Project Not Found');
            error.status = 404;
            throw error;
        }
        
        res.render('project', {
            title: project.title,
            project: project
        });
    } catch (error) {
        next(error);
    }
};

// 4. Exportamos ambas funciones
export { showProjectsPage, showProjectDetailsPage }; */



import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
// 💡 NUEVO: Importamos la función para traer las categorías asociadas al proyecto
import { getCategoriesByProject } from '../models/categories.js';

// 1. Constante para limitar a 5 proyectos
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// 2. Controlador actualizado para mostrar solo los próximos 5 proyectos
const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        const title = 'Upcoming Service Projects'; 

        res.render('projects', { title, projects });
    } catch (error) {
        next(error); 
    }
};  

// 3. Controlador de detalles modificado para incluir categorías
const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id; 
        const project = await getProjectDetails(projectId);
        
        if (!project) {
            const error = new Error('Service Project Not Found');
            error.status = 404;
            throw error;
        }
        
        // 💡 NUEVO: Consultamos las categorías asociadas a este projectId
        const categories = await getCategoriesByProject(projectId);
        
        // 💡 NUEVO: Pasamos las 'categories' encontradas a la vista project.ejs
        res.render('project', {
            title: project.title,
            project: project,
            categories: categories 
        });
    } catch (error) {
        next(error);
    }
};

// 4. Exportamos ambas funciones
export { showProjectsPage, showProjectDetailsPage };