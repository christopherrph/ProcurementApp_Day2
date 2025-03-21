import multer from 'multer';
import path from 'path';

export function Multer(
    type: "Memory" | "Disk" = "Memory",
    fileprefix?: string,
    folderName?: string
){

    const defaultDir = path.join(__dirname, '../../public/uploads');
    const storage = 
    type === "Memory" 
    ? multer.memoryStorage()
    
    : multer.diskStorage({
        destination: folderName ? path.join(defaultDir, folderName) : defaultDir,
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, fileprefix ? fileprefix + '-' + uniqueSuffix + path.extname(file.originalname) : uniqueSuffix + path.extname(file.originalname));
        }
    })

    return multer({ storage });
}
