import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PhotoService{
    // create photo
    static async addPhoto(link: string, id: number, title: string, description: string): Promise<void> {
        try {
            await prisma.photo.create({
                data: {
                    link,
                    id,
                    title,
                    description,
                },
            });
            console.log('Photo added successfully!');
        } catch (error) {
            console.error('Error adding photo:', error);
        }
    }

    // get all photos
    static async getPhotos(){
        const photos = await prisma.photo.findMany({
            select: {
                id: true,
                link: true,
                title: true,
                description: true
            },
        });

        return photos;
    }

    //get single photo by id
    static async getPhoto(id: number){
        const photo = await prisma.photo.findMany({
            where: { id },
            select: {
                link: true,
                title: true,
                description: true
            },
        });

        return photo;
    }

    // update photo information
    static async updatePhoto(id: number, title: string, description: string){
        try {
            const updatedPhoto = await prisma.photo.update({
                where: { id },
                data: {
                    title: title || undefined,
                    description: description || undefined,
                },
            });
            console.log('Photo updated successfully!');
            return updatedPhoto;
        } catch (error) {
            console.error('Error updating photo:', error);
        }
    };

    // delete photo
    static async deletePhoto(id: number){
        const deletedPhoto = await prisma.photo.delete({
            where: { id }
        });

        return deletedPhoto;
    };
}

export default PhotoService;