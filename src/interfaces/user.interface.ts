export interface RegisterParams{
    name: string;
    email: string;
    password: string;
    file?: Express.Multer.File | undefined;
}

export interface LoginParams{
    email: string;
    password: string;
}