import { Client } from 'pg';

export default async function handler(req, res) {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    return res.status(500).json({ error: "DATABASE_URL is missing in environment variables." });
  }

  const client = new Client({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    
    // Auto-create leads table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        email VARCHAR(255),
        property_id VARCHAR(100),
        property_name VARCHAR(255),
        unit_ref VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT current_timestamp
      )
    `);

    // Schema Migration
    await client.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS property_id VARCHAR(100)`);
    await client.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS property_name VARCHAR(255)`);

    if (req.method === 'GET') {
      const result = await client.query('SELECT * FROM leads ORDER BY created_at DESC');
      res.status(200).json(result.rows);
      
    } else if (req.method === 'POST') {
      const leadData = req.body;
      const query = `
        INSERT INTO leads (name, phone, email, property_id, property_name, unit_ref, message) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`;
      const values = [
        leadData.name,
        leadData.phone,
        leadData.email || '',
        leadData.propertyId || '',
        leadData.propertyName || '',
        leadData.unitRef || '',
        leadData.message || ''
      ];
      
      const result = await client.query(query, values);
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "Missing ID" });
      await client.query('DELETE FROM leads WHERE id = $1', [id]);
      res.status(200).json({ message: 'Lead deleted' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ 
      error: 'Database connection failed', 
      details: error.message,
      hint: "Check if DATABASE_URL is set correctly in Vercel."
    });
  } finally {
    await client.end();
  }
}
