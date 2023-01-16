import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import ProjectPreview from './ProjectPreview';

const dummyProjects = [
    {
        nme: 'Blackletther',
        url: 'font/test-font',
        projectImage:
            'https://upload.wikimedia.org/wikipedia/commons/2/27/Gutenberg_bible_Old_Testament_Epistle_of_St_Jerome.jpg',
        author: {
            nme: 'gutenberg.lens',
            url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg',
        },
    },
    {
        nme: 'Foundethional',
        url: 'font/test-font',
        projectImage:
            'https://www.calligraphersguild.org/exhibits/2009-SheilaWaters/sw-roundel-large.jpg',
        author: {
            nme: 'sheila.lens',
            url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            avatar: 'https://www.calligraphersguild.org/images/SHEILA-WATERS-Zoe--by-Yukimi-Annand-2016.jpg',
        },
    },
    {
        nme: 'Bitdoni',
        url: 'font/test-font',
        projectImage:
            'https://museobodoniano.com/appwp/wp-content/uploads//2018/05/museo-bodoniano-giambattista-bodoni-opera-punzoni-copertina.jpg',
        author: {
            nme: 'bodoni.lens',
            url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Giambattista_Bodoni_by_Giuseppe_Lucatelli.jpg',
        },
    },
    {
        nme: 'Ethrajan',
        url: 'font/test-font',
        projectImage:
            'https://upload.wikimedia.org/wikipedia/commons/e/e4/Trajan_typeface_specimen.svg',
        author: {
            nme: 'twombly.lens',
            url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            avatar: 'https://www.fontshop.com/cdn-cgi/image/format=auto/https://fontshop-prod-responsive-images.s3.amazonaws.com/uploads/profile_image/attachment/386499/large_Carol-Twombly_crop@2x.jpg',
        },
    },
    {
        nme: 'Bitdana',
        url: 'font/test-font',
        projectImage:
            'https://upload.wikimedia.org/wikipedia/commons/0/01/VerdanaSpecimen.svg',
        author: {
            nme: 'carter.lens',
            url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/05/20180914-ATypI-2018-Matthew_Carter-NP.jpg',
        },
    },
    {
        nme: 'Alcubit',
        url: 'font/test-font',
        projectImage:
            'https://www.linotype.com/cdn-cgi/image/format=auto/https://image.linotype.com/cms/alcuin_01a_d31413i32.gif',
        author: {
            nme: 'gudrun.lens',
            url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/20160320T160542-GZvH-NP.jpg',
        },
    },
];

const GET_FONTS = gql`
    query GetFonts {
        fontProjects {
            metaData {
              name
             description
            }
            id
            perCharacterMintPrice
            launchDateTime
            createdAt
            updatedAt
            fontFilesCID
        }
    }
`;

export default function Gallery(props) {
    const [projects] = useState(dummyProjects);

    const { loading, error, data } = useQuery(GET_FONTS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data); // Now retreives data from SmartContract

    return (
        <div className='container max-w-screen-xl flex flex-col flex-wrap md:flex-row gap-5 justify-between items-between pl-6 pr-6 pb-12'>
            {projects.map((project, i) => {
                return (
                    <ProjectPreview
                        key={`project-${i}`}
                        projectName={project.nme}
                        author={project.author.nme}
                        avatar={project.author.avatar}
                        authorurl={project.author.url}
                        projectImage={project.projectImage}
                        url={project.url}
                        token={props.token}
                        address={props.address}
                    />
                );
            })}
        </div>
    );
}
