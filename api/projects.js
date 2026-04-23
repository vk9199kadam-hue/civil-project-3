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
    
    // Auto-create tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) DEFAULT 'RESIDENTIAL',
        sub_type VARCHAR(100),
        type VARCHAR(100),
        data JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT current_timestamp
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name STRING NOT NULL,
        phone STRING,
        email STRING,
        property_id STRING,
        property_name STRING,
        unit_ref STRING,
        message TEXT,
        status STRING DEFAULT 'new',
        created_at TIMESTAMP DEFAULT current_timestamp()
      )
    `);

    if (req.method === 'GET') {
      const result = await client.query('SELECT * FROM projects ORDER BY created_at DESC');
      const formattedProjects = result.rows.map(row => ({
        ...row.data,
        id: row.id,
        name: row.name,
        category: row.category,
        subType: row.sub_type,
        type: row.type,
        created_at: row.created_at
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
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "Missing ID" });
      await client.query('DELETE FROM projects WHERE id = $1', [id]);
      res.status(200).json({ message: 'Project deleted' });
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
