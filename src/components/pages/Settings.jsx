import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings, useUpdateSettings } from '../../hooks/useSettings';
import './settings.scss';

export default function Settings() {
  const navigate = useNavigate();
  const { data: settings, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();

  const [formData, setFormData] = useState({
    restaurantName: '',
    tagline: '',
    logoUrl: '',
    backgroundImageUrl: '',
    primaryColor: '#D4AF37',
    accentColor: '#B87333',
    backgroundColor: '#1C1C1E',
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        restaurantName: settings.restaurantName || '',
        tagline: settings.tagline || '',
        logoUrl: settings.logoUrl || '',
        backgroundImageUrl: settings.backgroundImageUrl || '',
        primaryColor: settings.primaryColor || '#D4AF37',
        accentColor: settings.accentColor || '#B87333',
        backgroundColor: settings.backgroundColor || '#1C1C1E',
      });
    }
  }, [settings]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        navigate('/dashboard');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    const setUploading = fieldName === 'logoUrl' ? setUploadingLogo : setUploadingBackground;
    setUploading(true);

    try {
      // Convert to base64 data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [fieldName]: reader.result }));
        setUploading(false);
      };
      reader.onerror = () => {
        alert('Failed to read file');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Failed to upload image');
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(formData);
      alert('Settings updated successfully!');
    } catch (error) {
      alert(`Failed to update settings: ${error.message}`);
    }
  };

  const resetToDefaults = () => {
    setFormData({
      restaurantName: 'The Traveling Taphouse',
      tagline: 'Craft Beers & Culinary Excellence',
      logoUrl: '',
      backgroundImageUrl: '',
      primaryColor: '#D4AF37',
      accentColor: '#B87333',
      backgroundColor: '#1C1C1E',
    });
  };

  if (isLoading) {
    return <div className="settings-loading">Loading settings...</div>;
  }

  return (
    <div className="settings-page" onClick={() => navigate('/dashboard')}>
      <div className="settings-container" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => navigate('/dashboard')}
          className="close-button"
          aria-label="Close settings"
        >
          ✕
        </button>
        <h1 className="settings-title">Restaurant Settings</h1>
        <p className="settings-subtitle">Customize your menu display branding</p>

        <form onSubmit={handleSubmit} className="settings-form">
          {/* Restaurant Info */}
          <section className="form-section">
            <h2 className="section-title">Restaurant Information</h2>

            <div className="form-group">
              <label htmlFor="restaurantName">Restaurant Name *</label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                required
                maxLength="255"
                placeholder="e.g., The Traveling Taphouse"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tagline">Tagline</label>
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                maxLength="255"
                placeholder="e.g., Craft Beers & Culinary Excellence"
              />
            </div>
          </section>

          {/* Images */}
          <section className="form-section">
            <h2 className="section-title">Images</h2>

            <div className="form-group">
              <label htmlFor="logoUrl">Logo</label>
              <div className="image-upload-group">
                <input
                  type="url"
                  id="logoUrl"
                  name="logoUrl"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL or upload file"
                />
                <label htmlFor="logoFile" className="upload-btn">
                  {uploadingLogo ? 'Uploading...' : 'Upload File'}
                </label>
                <input
                  type="file"
                  id="logoFile"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'logoUrl')}
                  style={{ display: 'none' }}
                />
              </div>
              <small>Recommended: Square image, transparent background (Max 5MB)</small>
            </div>

            <div className="form-group">
              <label htmlFor="backgroundImageUrl">Background Image</label>
              <div className="image-upload-group">
                <input
                  type="url"
                  id="backgroundImageUrl"
                  name="backgroundImageUrl"
                  value={formData.backgroundImageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL or upload file"
                />
                <label htmlFor="backgroundFile" className="upload-btn">
                  {uploadingBackground ? 'Uploading...' : 'Upload File'}
                </label>
                <input
                  type="file"
                  id="backgroundFile"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'backgroundImageUrl')}
                  style={{ display: 'none' }}
                />
              </div>
              <small>Recommended: High-resolution, landscape orientation (Max 5MB)</small>
            </div>
          </section>

          {/* Color Scheme */}
          <section className="form-section">
            <h2 className="section-title">Color Scheme</h2>

            <div className="color-grid">
              <div className="form-group">
                <label htmlFor="primaryColor">Primary Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    name="primaryColor"
                    placeholder="#D4AF37"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
                <small>Used for accents and highlights</small>
              </div>

              <div className="form-group">
                <label htmlFor="accentColor">Accent Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    id="accentColor"
                    name="accentColor"
                    value={formData.accentColor}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={formData.accentColor}
                    onChange={handleChange}
                    name="accentColor"
                    placeholder="#B87333"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
                <small>Secondary accent color</small>
              </div>

              <div className="form-group">
                <label htmlFor="backgroundColor">Background Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    id="backgroundColor"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={formData.backgroundColor}
                    onChange={handleChange}
                    name="backgroundColor"
                    placeholder="#1C1C1E"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
                <small>Main background color</small>
              </div>
            </div>
          </section>

          {/* Preview */}
          <section className="form-section">
            <h2 className="section-title">Preview</h2>
            <div
              className="settings-preview"
              style={{
                '--primary': formData.primaryColor,
                '--accent': formData.accentColor,
                '--background': formData.backgroundColor,
              }}
            >
              <h3 style={{ color: formData.primaryColor }}>
                {formData.restaurantName || 'Your Restaurant'}
              </h3>
              <p style={{ color: formData.accentColor }}>
                {formData.tagline || 'Your tagline here'}
              </p>
            </div>
          </section>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={resetToDefaults}
              className="btn-secondary"
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

          {updateMutation.isError && (
            <div className="error-message">
              Error: {updateMutation.error.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
