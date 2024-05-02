import { Request, Response } from "express";
import PhotoService from './photo.service';

class PhotoController {
    static async addPhoto(req: Request, res: Response): Promise<void> {
        const { link, id, title, description } = req.body;
        try {
            await PhotoService.addPhoto(link, id, title, description);
            res.status(200).send('Photo added successfully!');
        } catch (error) {
            res.status(500).send(`Error adding photo: ${error}`);
        }
    }

    static async getPhotos(req: Request, res: Response): Promise<void> {
        try {
            const photos = await PhotoService.getPhotos();
            res.status(200).send(photos);
        } catch (error) {
            res.status(500).send(`Error getting photos: ${error}`);
        }
    }  

    static async getPhoto(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const photo = await PhotoService.getPhoto(id);
            res.status(200).send(photo);
        } catch (error) {
            res.status(500).send(`Error getting photo: ${error}`);
        }
    }

    static async updatePhoto(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const { title, description } = req.body;
            await PhotoService.updatePhoto(id, title, description);
            res.status(200).send('Photo updated successfully!');
        } catch (error) {
            res.status(500).send(`Error updating photo: ${error}`);
        }
    };

    static async deletePhoto(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            await PhotoService.deletePhoto(id);
            res.status(200).send('Photo deleted successfully!');
        } catch (error) {
            res.status(500).send(`Error deleting photo: ${error}`);
        }
    }
}

export default PhotoController;