import { Client } from 'pg';

export default async function handler(req, res) {
  // Uses the Environment Variable configured in Vercel
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    return res.status(500).json({ error: "DATABASE_URL is missing in environment variables." });
  }

  const client = new Client({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false // This allows connection on Vercel without a custom local certificate file
    }
  });
  
  try {
    await client.connect();
    
    // Auto-create table and ensure the schema is up to date
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

    // Schema Migration: Add missing columns if they don't exist in an old table
    await client.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS category STRING`);
    await client.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS sub_type STRING`);
    await client.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS type STRING`);

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
    res.status(500).json({ 
      error: 'Database connection failed', 
      details: error.message,
      hint: "Check if DATABASE_URL is set correctly in Vercel with the full 'postgresql://' prefix." 
    });
  } finally {
    await client.end();
  }
}
