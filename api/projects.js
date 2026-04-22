import { Client } from 'pg';

export default async function handler(req, res) {
  // Try to use standard SSL for modern Node environments (like Vercel)
  // Fall back to the absolute local path for localhost development if needed.
  let connectionString = "postgresql://civil_project_user:civil%20project%20pas-dZKmWUaoSB2sdr_cL47HSQ@69958b9b-c09e-41bb-849c-23b14b0b8ec0.cockroachlabs.cloud:26257/defaultdb";
  
  const client = new Client({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false // This allows connection on Vercel without a custom local certificate file
    }
  });
  
  try {
    await client.connect();
    
    // Auto-create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name STRING NOT NULL,
        category STRING,
        sub_type STRING,
        type STRING,
        data JSONB,
        created_at TIMESTAMP DEFAULT current_timestamp()
      )
    `);

    if (req.method === 'GET') {
      const result = await client.query('SELECT * FROM projects ORDER BY created_at DESC');
      // Format data properly for the frontend
      const formattedProjects = result.rows.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category,
        subType: row.sub_type,
        type: row.type,
        ...row.data
      }));
      res.status(200).json(formattedProjects);
      
    } else if (req.method === 'POST') {
      const projectData = req.body;
      const query = `
        INSERT INTO projects (name, category, sub_type, type, data) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`;
      const values = [
        projectData.name || 'Untitled', 
        projectData.category || 'RESIDENTIAL', 
        projectData.subType || '', 
        projectData.type || 'property', 
        projectData
      ];
      
      const result = await client.query(query, values);
      res.status(201).json(result.rows[0]);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  } finally {
    await client.end();
  }
}
