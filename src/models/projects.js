import db from './db.js';

const getAllProjects = async () => {
    // La consulta incluye un JOIN para traer el nombre del patrocinador directamente
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.location, 
            p.project_date,
            o.name AS sponsor_organization
        FROM public.service_project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        ORDER BY p.project_date ASC;
    `;

    const result = await db.query(query);
    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date AS date -- 👈 Renombramos project_date a "date" para que coincida con lo que espera tu vista EJS
        FROM public.service_project -- 👈 Cambiado a tu tabla real
        WHERE organization_id = $1
        ORDER BY project_date; -- 👈 Cambiado a tu columna real de fecha
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
      SELECT 
        p.project_id, 
        p.title, 
        p.description, 
        p.project_date AS date, 
        p.location, 
        p.organization_id,
        o.name AS organization_name
      FROM public.service_project p
      JOIN public.organization o ON p.organization_id = o.organization_id
      WHERE p.project_date >= CURRENT_DATE
      ORDER BY p.project_date ASC
      LIMIT $1;
    `;
    
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

/**
 * Obtiene los detalles de un solo proyecto por su ID
 */
const getProjectDetails = async (id) => {
    const query = `
      SELECT 
        p.project_id, 
        p.title, 
        p.description, 
        p.project_date AS date, 
        p.location, 
        p.organization_id,
        o.name AS organization_name
      FROM public.service_project p
      JOIN public.organization o ON p.organization_id = o.organization_id
      WHERE p.project_id = $1;
    `;
    
    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Export the model functions
export { 
  getAllProjects, 
  getProjectsByOrganizationId, 
  getUpcomingProjects, 
  getProjectDetails 
};
// Export the model functions
