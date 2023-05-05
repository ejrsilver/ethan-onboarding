import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const buildingDir = path.join(process.cwd(), 'buildings');

export function getBuildingsData() {
    const fileNames = fs.readdirSync(buildingDir);
    const allData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(buildingDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        return {
            id,
            ...matterResult.data,
        };
    });

    return allData;
}