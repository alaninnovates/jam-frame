import { Project } from './types';

export const projects = [
    {
        id: 1,
        title: 'String Quartet - Mozart',
        createdAt: new Date(),
        lastModified: new Date(),
        duration: 100,
        thumbnail:
            'https://allaboutmozart.com/wp-content/uploads/2021/04/MozartHaydnPlaying-770x510.jpg',
    },
    {
        id: 2,
        title: 'Jazz Ensemble - Duke Ellington',
        createdAt: new Date(),
        lastModified: new Date(),
        duration: 120,
        thumbnail:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Duke_Ellington_Big_Band.jpg/1200px-Duke_Ellington_Big_Band.jpg',
    },
    {
        id: 3,
        title: 'Rock Band - The Beatles',
        createdAt: new Date(),
        lastModified: new Date(),
        duration: 150,
        thumbnail:
            'https://preview.redd.it/whats-your-opinion-on-the-beatles-rock-band-v0-9n10d3c36cgd1.jpeg?auto=webp&s=07704efc6f39ab11434c51a782f8b1450037a690',
    },
    {
        id: 4,
        title: 'Electronic Duo - Daft Punk',
        createdAt: new Date(),
        lastModified: new Date(),
        duration: 180,
        thumbnail:
            'https://i.guim.co.uk/img/media/8f907d9d21a799efa5bac251d6c5e0457121e398/0_373_2096_1257/master/2096.jpg?width=465&dpr=1&s=none&crop=none',
    },
] as Project[];
