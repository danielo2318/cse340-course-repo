/* import { getAllCategories } from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

// Export any controller functions
export { showCategoriesPage }; */

import { getAllCategories, getCategoryById, getProjectsByCategory } from '../models/categories.js';

// 1. Controlador de la página general de categorías (actualizado con manejo de errores)
const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Service Categories';

        res.render('categories', { title, categories });
    } catch (error) {
        next(error); // Pasa cualquier fallo al manejador de errores global
    }
};  

// 2. NUEVO: Controlador para los detalles de una categoría individual (/category/:id)
const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id; // Extrae el ID desde los parámetros de la URL

        // Ejecutamos ambas consultas al modelo para obtener los datos necesarios
        const category = await getCategoryById(categoryId);
        const projects = await getProjectsByCategory(categoryId);

        // Si la categoría no existe en la base de datos, lanzamos un 404 seguro
        if (!category) {
            const error = new Error('Category Not Found');
            error.status = 404;
            throw error;
        }

        // Renderizamos la nueva vista pasando la información recolectada
        res.render('category-details', {
            title: `Category: ${category.name}`,
            category: category,
            projects: projects
        });
    } catch (error) {
        next(error);
    }
};

// Exportamos ambas funciones
export { showCategoriesPage, showCategoryDetailsPage };