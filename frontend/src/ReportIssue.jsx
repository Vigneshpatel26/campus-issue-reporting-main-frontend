
import { useState } from 'react'
import './ReportIssue.css'

function ReportIssue({ onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
  })

  const [photo, setPhoto] = useState(null)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('Issue submitted:', formData)
    console.log('Selected photo:', photo)

    setMessage(
      'Your issue form was submitted successfully! Backend integration will be added later.'
    )

    setFormData({
      title: '',
      category: '',
      location: '',
      description: '',
    })

    setPhoto(null)
    event.target.reset()
  }
  
async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await fetch('http://localhost:8082/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to save issue');
    }

    const savedIssue = await response.json();

    setMessage('Issue saved successfully! ID: ' + savedIssue.id);

    setFormData({
      title: '',
      category: '',
      location: '',
      description: '',
    });

    setPhoto(null);
    event.target.reset();
  } catch (error) {
    console.error(error);
    setMessage('Failed to save issue. Check the backend.');
  }
}


  return (
    <div className="report-page">
      <header className="report-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>

        <span className="report-brand">CampusCare</span>
      </header>

      <main className="report-container">
        <div className="report-heading">
          <p className="report-eyebrow">CAMPUSCARE / REPORT ISSUE</p>
          <h1>Report a Campus Issue</h1>
          <p>
            Tell us about the problem. Your report can help make
            our campus safer, cleaner, and better.
          </p>
        </div>

        {message && (
          <div className="success-message" role="status">
            <strong>✓ Thank you!</strong>
            <p>{message}</p>
            <button onClick={() => setMessage('')}>
              Dismiss
            </button>
          </div>
        )}

        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-section-title">
            <span className="section-number">01</span>
            <div>
              <h2>Issue Details</h2>
              <p>Describe the issue you have noticed.</p>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="title">Issue Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Broken lights in classroom"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={120}
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Issue Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Electrical">Electrical</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Classroom">Classroom</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Hostel">Hostel</option>
              <option value="Washroom">Washroom</option>
              <option value="Furniture">Furniture</option>
              <option value="Internet">Internet / Wi-Fi</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="location">Campus Location *</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Block A, Room 204"
              value={formData.location}
              onChange={handleChange}
              required
              maxLength={200}
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Issue Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Explain the problem and where it occurred..."
              value={formData.description}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={2000}
              rows={5}
            />
            <small>Minimum 10 characters.</small>
          </div>

          <div className="form-field">
            <label htmlFor="photo">Upload Photo (Optional)</label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => {
                const file = event.target.files?.[0]

                if (file && file.size > 5 * 1024 * 1024) {
                  alert('Please select an image smaller than 5 MB.')
                  event.target.value = ''
                  setPhoto(null)
                  return
                }

                setPhoto(file || null)
              }}
            />
            <small>PNG, JPG or WebP. Maximum size: 5 MB.</small>
            {photo && (
              <p className="selected-file">
                Selected: {photo.name}
              </p>
            )}
          </div>

          <div className="form-note">
            <span>🔒</span>
            <p>
              Please provide accurate information so the
              appropriate team can address the issue.
            </p>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>

            <button type="submit" className="submit-button">
              Submit Issue →
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ReportIssue
