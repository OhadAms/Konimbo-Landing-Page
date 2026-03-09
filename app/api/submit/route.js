export async function POST(request) {

  try {
    // 1. Read the data sent from the form
    const body = await request.json()
    const { name, familyName, email, message } = body

    // 2. Validate that all fields are present
    if (!name || !familyName || !email || !message) {
      return Response.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // 3. Read credentials from .env.local
    const apiKey    = process.env.AIRTABLE_API_KEY
    const baseId    = process.env.AIRTABLE_BASE_ID
    const tableName = process.env.AIRTABLE_TABLE_NAME

    // 4. Send the data to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Name':    name,
                'Family Name': familyName,
                'Email':        email,
                'Message':      message,
                'Submitted At': new Date().toISOString()
              }
            }
          ]
        })
      }
    )

    // 5. Check if Airtable accepted it
    if (!airtableResponse.ok) {
      const airtableError = await airtableResponse.json()
      console.error('Airtable error:', airtableError)
      return Response.json(
        { error: 'Failed to save your message. Please try again.' },
        { status: 500 }
      )
    }

    // 6. Return success to the form
    return Response.json({ success: true })

  } catch (err) {
    console.error('Server error:', err)
    return Response.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}