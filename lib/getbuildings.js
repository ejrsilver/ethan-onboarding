import fs from 'fs';
import path from 'path';

const buildingDir = path.join(process.cwd(), 'buildings');

export function getBuildingsMinimalData() {
    const fileNames = fs.readdirSync(buildingDir);
    const allData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.json$/, '');
        const fullPath = path.join(buildingDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const result = JSON.parse(fileContents);
        const name = result['name'];
        const coords = result['coords'];
        return {
            id,
            name, 
            coords,
        };
    });

    return allData;
}

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
            },
        };
    });
}

export function getAllMaps() {
    return ["main", "west"].map((label) => {
        return {
            params: {
                map: label,
            },
        };
    });
}

export function getMapData(map) {
    const name = (map == "main") ? "Main" : "West";
    const coords = (map == "main") ? [44.226, -76.4960] : [44.228, -76.5136];
    return {
        name,
        coords,
    };
}
export function getBuildingData(id) {
    const fullPath = path.join(buildingDir, `${id}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const result = JSON.parse(fileContents);

    return {
        id,
        ...result,
    };
}