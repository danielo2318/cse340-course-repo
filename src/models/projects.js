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

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId };