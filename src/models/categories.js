/* import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.project_category
        ORDER BY name ASC;
    `;

    const result = await db.query(query);
    return result.rows;
};

export { getAllCategories }; */



import db from './db.js';

/**
 * 1. Obtiene todas las categorías de forma alfabética
 */
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.project_category
        ORDER BY name ASC;
    `;
    const result = await db.query(query);
    return result.rows;
};

/**
 * 2. Obtiene una sola categoría por su ID
 */
const getCategoryById = async (id) => {
    const query = `
        SELECT category_id, name
        FROM public.project_category
        WHERE category_id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * 3. Obtiene todos los proyectos asociados a una categoría específica
 * Usando la tabla intermedia correcta: public.project_category_mapping
 */
const getProjectsByCategory = async (category_id) => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.project_date AS date, 
            p.location
        FROM public.service_project p
        JOIN public.project_category_mapping pcm ON p.project_id = pcm.project_id
        WHERE pcm.category_id = $1
        ORDER BY p.project_date ASC;
    `;
    const result = await db.query(query, [category_id]);
    return result.rows;
};

/**
 * 4. Obtiene todas las categorías asignadas a un proyecto específico
 */
const getCategoriesByProject = async (project_id) => {
    const query = `
        SELECT 
            c.category_id, 
            c.name
        FROM public.project_category c
        JOIN public.project_category_mapping pcm ON c.category_id = pcm.category_id
        WHERE pcm.project_id = $1
        ORDER BY c.name ASC;
    `;
    const result = await db.query(query, [project_id]);
    return result.rows;
};

export { 
    getAllCategories, 
    getCategoryById, 
    getProjectsByCategory, 
    getCategoriesByProject 
};