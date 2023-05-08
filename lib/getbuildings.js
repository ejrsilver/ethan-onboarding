import fs from 'fs';
import path from 'path';

const buildingDir = path.join(process.cwd(), 'buildings');

export function getBuildingsData() {
    const fileNames = fs.readdirSync(buildingDir);
    const allData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.json$/, '');
        const fullPath = path.join(buildingDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const result = JSON.parse(fileContents);

        return {
            id,
            ...result,
        };
    });

    return allData;
}

export function getAllIds() {
    const fileNames = fs.readdirSync(buildingDir);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.json$/, ''),
            }
        }
    })
}

export function getBuildingData({id}) {
    const fullPath = path.join(buildingDir, `${id}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const result = JSON.parse(fileContents);

    return {
        id,
        ...result,
    };
}