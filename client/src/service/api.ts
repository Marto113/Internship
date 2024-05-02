export interface ImagesData {
    id: number;
    link: string;
    title: string;
    description: string;
}

export const fetchImages = async () => {
    try {
        const response = await fetch('http://localhost:4000/photos');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching images');
        return [];
    }
}

export const deleteImage = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:4000/photos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete image');
        }

    } catch (error) {
        console.error(error);
        return false;
    }

    return true;
};

export const uploadImage = async (link: string, title: string, description: string) => {
    try {
        const data = {link, title, description};
        const response = await fetch(`http://localhost:4000/photos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

    } catch (error) {
        console.error(error);
        return false;
    }

    return true;
}

export const editImage = async (id: number, title: string, description: string ) => {
    try {
        const data = {title, description};
        const response = await fetch(`http://localhost:4000/photos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

    } catch (error) {
        console.error(error);
        return false;
    }

    return true;
}

export const searchImage = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:4000/photos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error){
        console.error(error);
    }
}
