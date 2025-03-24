import React, { useState, useEffect } from 'react';

// Define the social media platforms
const DEFAULT_PLATFORMS = [
  { id: "instagram", name: "Instagram", placeholder: "https://instagram.com/yourusername" },
  { id: "twitter", name: "Twitter", placeholder: "https://twitter.com/yourusername" },
  { id: "linkedin", name: "LinkedIn", placeholder: "https://linkedin.com/in/yourusername" },
  { id: "github", name: "GitHub", placeholder: "https://github.com/yourusername" },
];

// Type definition for a platform
type Platform = {
  id: string;
  name: string;
  placeholder: string;
};

// Type definition for form submission results
export type FormSubmissionResult = {
  type: string;
  platform?: string;
  username?: string;
  url?: string;
  profileImage?: string | null;
};

export default function ProfileLinksPage() {
  // State management
  const [username, setUsername] = useState('');
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>(
    DEFAULT_PLATFORMS.reduce((acc, platform) => {
      acc[platform.id] = '';
      return acc;
    }, {} as Record<string, string>)
  );
  const [customPlatforms, setCustomPlatforms] = useState<Platform[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formResults, setFormResults] = useState<FormSubmissionResult[] | null>(null);
  const [newPlatformName, setNewPlatformName] = useState('');

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add custom platform
  const addCustomPlatform = () => {
    if (!newPlatformName.trim()) {
      alert('Please enter a platform name');
      return;
    }
    
    const id = `custom-${Date.now()}`;
    const newPlatform: Platform = {
      id,
      name: newPlatformName,
      placeholder: 'https://example.com/your-link',
    };
    
    setCustomPlatforms(prev => [...prev, newPlatform]);
    setSocialLinks(prev => ({ ...prev, [id]: '' }));
    setNewPlatformName('');
  };

  // Remove custom platform
  const removePlatform = (id: string) => {
    setCustomPlatforms(prev => prev.filter(platform => platform.id !== id));
    setSocialLinks(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Prepare form submission results
      const results: FormSubmissionResult[] = [
        // Profile information
        {
          type: 'profile',
          username,
          profileImage: avatarSrc
        },
        // Default and custom platforms
        ...getAllPlatforms().map(platform => ({
          type: platform.id.startsWith('custom-') ? 'custom_link' : 'default_link',
          platform: platform.name,
          url: socialLinks[platform.id] || ''
        })).filter(link => link.url)
      ];

      // Update form results state
      setFormResults(results);
      
      // Success feedback
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Combine default and custom platforms
  const getAllPlatforms = (): Platform[] => [
    ...DEFAULT_PLATFORMS, 
    ...customPlatforms
  ];

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Create Your Profile Links</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          <label htmlFor="profile-image" className="cursor-pointer">
            {avatarSrc ? (
              <img 
                src={avatarSrc} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                Upload Image
              </div>
            )}
          </label>
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block mb-2">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Social Links Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Social Links</h2>
            <button
              type="button"
              onClick={() => {
                const platformName = prompt('Enter platform name:');
                if (platformName) {
                  setNewPlatformName(platformName);
                  addCustomPlatform();
                }
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add Platform
            </button>
          </div>

          {/* Platform Links */}
          {getAllPlatforms().map((platform) => (
            <div key={platform.id} className="mb-3">
              <label htmlFor={`platform-${platform.id}`} className="block mb-1">
                {platform.name}
              </label>
              <div className="flex">
                <input
                  id={`platform-${platform.id}`}
                  type="url"
                  value={socialLinks[platform.id] || ''}
                  onChange={(e) => setSocialLinks(prev => ({
                    ...prev,
                    [platform.id]: e.target.value
                  }))}
                  placeholder={platform.placeholder}
                  className="flex-grow p-2 border rounded-l"
                />
                {platform.id.startsWith('custom-') && (
                  <button
                    type="button"
                    onClick={() => removePlatform(platform.id)}
                    className="bg-red-500 text-white px-3 rounded-r"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {/* Form Results Display */}
      {formResults && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Submission Results:</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(formResults, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}