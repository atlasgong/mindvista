import fs from 'fs';
import path from 'path';

const DATA_FILE = "scripts/bulkUpload/entityData/clubsData.json";

interface ClubData {
    slug: string;
    title: string;
    description: string;
    website: string | null;
    email: string | null;
    phoneNumber: string | null;
    facebook: string | null;
    instagram: string | null;
    otherSocials: { link: string }[] | null;
    currentlyActive: boolean;
    tags: string[];
}

function cleanUrl(url: string | null, type: 'facebook' | 'instagram' | 'website'): string | null {
    if (!url) return null;
    
    // Remove any trailing slashes and whitespace
    url = url.trim().replace(/\/+$/, '');
    
    if (url === '') return null;

    try {
        if (type === 'facebook') {
            // Handle Facebook URLs
            const fbRegex = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([A-Za-z0-9._-]+)\/?/;
            const match = url.match(fbRegex);
            if (match) {
                return `https://www.facebook.com/${match[1]}`;
            }
            // If it looks like just a username/page name, construct the URL
            if (/^[A-Za-z0-9._-]+$/.test(url)) {
                return `https://www.facebook.com/${url}`;
            }
            return null;
        } else if (type === 'instagram') {
            // Handle Instagram URLs
            const igRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9._-]+)\/?/;
            const match = url.match(igRegex);
            if (match) {
                return `https://www.instagram.com/${match[1]}`;
            }
            // If it looks like just a username, construct the URL
            if (/^[A-Za-z0-9._-]+$/.test(url)) {
                return `https://www.instagram.com/${url}`;
            }
            return null;
        } else {
            // For regular websites
            // If URL doesn't start with http/https, add https://
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
            
            const urlObj = new URL(url);
            // Remove any query parameters and hash
            return urlObj.origin + urlObj.pathname.replace(/\/$/, '');
        }
    } catch (e) {
        console.error(`Invalid URL for ${type}:`, url);
        return null;
    }
}

async function cleanData() {
    // Read the data file
    const rawData = fs.readFileSync(path.join(process.cwd(), DATA_FILE), 'utf-8');
    const clubs: ClubData[] = JSON.parse(rawData);

    // Clean each club's data
    const cleanedClubs = clubs.map(club => ({
        ...club,
        // Ensure description is never empty string
        description: club.description || "No description available.",
        // Clean URLs
        website: cleanUrl(club.website, 'website'),
        facebook: cleanUrl(club.facebook, 'facebook'),
        instagram: cleanUrl(club.instagram, 'instagram'),
        // Clean otherSocials links
        otherSocials: club.otherSocials?.map(social => ({
            link: cleanUrl(social.link, 'website') || ''
        })).filter(social => social.link !== '') || null,
        // Ensure email is properly formatted or null
        email: club.email?.trim() || null
    }));

    // Write the cleaned data back to the original file
    const outputPath = path.join(process.cwd(), DATA_FILE);
    fs.writeFileSync(outputPath, JSON.stringify(cleanedClubs, null, 2));
    
    console.log('Data cleaning complete. File updated:', outputPath);
}

// Run the cleaning process
cleanData().catch(console.error);
