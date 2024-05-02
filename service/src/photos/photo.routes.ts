import { Router } from 'express';
import PhotoController from './photo.controller';

const photoRouter = Router();

photoRouter.post('/photos', PhotoController.addPhoto);
photoRouter.get('/photos', PhotoController.getPhotos);
photoRouter.get('/photos/:id', PhotoController.getPhoto);
photoRouter.delete('/photos/:id', PhotoController.deletePhoto);
photoRouter.put('/photos/:id', PhotoController.updatePhoto);

export default photoRouter;