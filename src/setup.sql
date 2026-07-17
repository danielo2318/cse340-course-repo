CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

CREATE TABLE public.service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization
        FOREIGN KEY(organization_id) 
        REFERENCES public.organization(organization_id)
        ON DELETE CASCADE
);

SELECT * FROM service_project;

INSERT INTO public.service_project (organization_id, title, description, location, project_date)
VALUES
(1, 'Community Center Renovation', 'Help paint and repair the local community center building.', 'Downtown Community Center', '2026-08-12'),
(1, 'Park Cleanup & Benches', 'Join us to clean up local parks and install new wooden benches.', 'Central Park', '2026-08-19'),
(1, 'Wheelchair Ramp Construction', 'Building accessibility ramps for elderly residents in the neighborhood.', 'Westside Suburbs', '2026-09-05'),
(1, 'School Playground Repair', 'Fixing swings and painting the playground structures at the elementary school.', 'Lincoln Elementary', '2026-09-20'),
(1, 'Community Garden Fence', 'Constructing a protective wooden fence around the new garden lot.', 'North District', '2026-10-02'),

(2, 'Urban Harvest Festival', 'Help collect, package, and distribute fresh organic vegetables to families.', 'GreenHarvest Farm', '2026-08-15'),
(2, 'Composting Workshop Setup', 'Building community compost bins and teaching soil rotation basics.', 'East Side Eco-Park', '2026-08-28'),
(2, 'Tree Planting Initiative', 'Planting 50 fruit trees across local neighborhood sidewalks.', 'South Boulevard', '2026-09-12'),
(2, 'Greenhouse Winter Preparation', 'Preparing the urban greenhouse layers for the upcoming cold season.', 'Main Greenhouse Facility', '2026-10-10'),
(2, 'Hydroponics System Assembly', 'Help build vertical hydroponic lettuce racks for the community kitchen.', 'Community Kitchen Lab', '2026-10-24'),

(3, 'Annual Food Drive', 'Help collect, sort, and distribute canned food to families in need.', 'UnityServe Depot', '2026-08-22'),
(3, 'Community Tutoring Program', 'Volunteer to tutor elementary and high school students in math and science.', 'Public Library Room B', '2026-09-01'),
(3, 'Senior Center Companion Day', 'Spend the afternoon reading, playing board games, and talking with seniors.', 'Silver Linings Home', '2026-09-18'),
(3, 'Homeless Shelter Meal Service', 'Assisting in preparing and serving dinner at the downtown shelter.', 'Hope Shelter', '2026-10-05'),
(3, 'Youth Mentorship Kickoff', 'Orientation afternoon for new volunteers guiding local high school teens.', 'Civic Center Hall', '2026-10-15');