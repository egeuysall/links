# Security Policy

The security of **Links** and its users is a top priority. This document outlines our security policies, best practices, and guidelines for reporting vulnerabilities. If you identify a security issue, we encourage responsible disclosure to ensure the safety of all users.

## Supported Versions

We provide security updates only for the latest stable release of **Links**. Older versions are not maintained and may contain unpatched vulnerabilities. Below is the list of supported and unsupported versions:

| Version | Supported | Notes |
|---------|----------|-------|
| 1.0     | ✅ Yes   | Actively maintained and patched for security vulnerabilities. |
| 0.9     | ❌ No    | No security updates or support provided. Users should upgrade. |
| 0.8     | ❌ No    | No security updates or support provided. Users should upgrade. |
| 0.7     | ✅ Yes   | No security updates or support provided. Users should upgrade. |
| < 0.6   | ❌ No    | No security updates or support provided. Versions below 0.6 are not supported. Users should upgrade. |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly by following these steps:

1. **Confidential Disclosure**  
   - Do **not** disclose vulnerabilities publicly.  
   - Send a detailed report to **[hello@egeuysal.com](mailto:hello@egeuysal.com)**.  
   - For urgent security concerns, you may contact us directly at **+1 (657) 900-0231**.  

2. **Information to Include**  
   - A clear and detailed description of the vulnerability.  
   - Steps to reproduce the issue.  
   - The potential impact and affected components.  
   - Suggested mitigations or fixes (if available).  

3. **Response Timeline**  
   - **Acknowledgment**: We will confirm receipt within **48 hours**.  
   - **Investigation**: Our team will analyze and validate the report.  
   - **Resolution**: If confirmed, we will implement a fix and release an update.  
   - **Advisory**: Security advisories will be published if necessary.  

## Security Best Practices

To maintain the security of **Links**, users and developers should follow these best practices:

### Deployment Security
- **Use a secure hosting provider** (e.g., Vercel) with proper authentication and access control.  
- **Enforce HTTPS** to prevent data interception and ensure secure communication.  
- **Restrict API access** and avoid exposing sensitive endpoints publicly.  

### Application Security
- **Keep dependencies updated**: Run `npm audit` and update packages regularly.  
- **Use environment variables** to store sensitive data (e.g., API keys, database credentials).  
- **Validate user input** to prevent injection attacks (e.g., SQL Injection, XSS).  

### Development Security
- **Follow secure coding practices** and conduct code reviews.  
- **Enable security headers** such as Content Security Policy (CSP) and X-Frame-Options.  
- **Monitor for vulnerabilities** using tools like Dependabot or Snyk.  

## Responsible Disclosure

We appreciate the efforts of the security community in helping us maintain a secure project. Researchers are encouraged to follow responsible disclosure guidelines.

For any security concerns, please contact us at:  
📧 **[hello@egeuysal.com](mailto:hello@egeuysal.com)**  
📞 **+1 (657) 900-0231**  

## Additional Resources

- **[Documentation](https://www.links.egeuysal.com/documentation/)**  
- **[Changelog](https://www.links.egeuysal.com/changelog/)**  
- **GitHub Repository**: [github.com/egeuysall/links](https://github.com/egeuysall/links)  

## License

This project is licensed under the **[Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)**. Users must comply with its terms and conditions.
