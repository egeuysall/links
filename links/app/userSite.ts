import { FormSubmissionResult } from './create/page';

// Function to create the HTML for the user's site
const generateSiteHTML = (formResults: FormSubmissionResult[]): string => {
  // Extract profile information
  const profileData = formResults.find(item => item.type === 'profile');
  const username = profileData?.username || 'User';
  const profileImage = profileData?.profileImage || '';
  
  // Extract social links
  const links = formResults.filter(item => 
    item.type === 'default_link' || item.type === 'custom_link'
  );

  // Function to get the icon class for known platforms
  const getPlatformIcon = (platform: string): string => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('instagram')) return 'fab fa-instagram';
    if (lowerPlatform.includes('twitter')) return 'fab fa-twitter';
    if (lowerPlatform.includes('linkedin')) return 'fab fa-linkedin';
    if (lowerPlatform.includes('github')) return 'fab fa-github';
    if (lowerPlatform.includes('facebook')) return 'fab fa-facebook';
    if (lowerPlatform.includes('youtube')) return 'fab fa-youtube';
    if (lowerPlatform.includes('tiktok')) return 'fab fa-tiktok';
    return 'fas fa-link'; // Default icon
  };

  // Generate HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${username}'s Links</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }
        
        .container {
            max-width: 600px;
            width: 100%;
            margin: 40px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .profile-img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid white;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .username {
            margin-top: 15px;
            font-size: 28px;
            font-weight: bold;
        }
        
        .links-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 15px;
        }
        
        .link {
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
            padding: 16px 20px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .link:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }
        
        .link i {
            margin-right: 12px;
            font-size: 20px;
            width: 24px;
            text-align: center;
        }
        
        .footer {
            margin-top: 40px;
            opacity: 0.8;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="profile">
            ${profileImage 
              ? `<img class="profile-img" src="${profileImage}" alt="${username}'s profile">`
              : `<div class="profile-img" style="background-color: #ddd; display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-user" style="font-size: 40px; color: #888;"></i>
                </div>`
            }
            <h1 class="username">@${username}</h1>
        </div>
        
        <div class="links-container">
            ${links.map(link => `
                <a href="${link.url}" class="link" target="_blank" rel="noopener noreferrer">
                    <i class="${getPlatformIcon(link.platform || '')}"></i>
                    ${link.platform}
                </a>
            `).join('')}
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} ${username} • Made with ❤️</p>
        </div>
    </div>
</body>
</html>`;
};

// Create the userSite object
const createUserSite = (formResults: FormSubmissionResult[]) => {
  // Generate the HTML
  const html = generateSiteHTML(formResults);
  
  return {
    html,
    getHTML: () => html
  };
};

// Export the function to create a user site
export default createUserSite;

// Export the type for TypeScript support
export type { FormSubmissionResult } from './create/page';