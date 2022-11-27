import Link from 'next/link';
// Lens Mirror
import { client as lensClient, mirror } from '../../api';
console.log(mirror);

export default function ProjectPreview(props) {
    async function mirrorPost() {
        console.log('Mirrored');
    }

    return (
        <div className='max-w-sm min-w-fit container flex  flex-col border-2 border-solid border-red rounded'>
            <div className='container flex flex-row items-center p-4 h-8'>
                {' '}
                <button onClick={mirrorPost}>
                    <svg
                        className='h-5   fill-yellow  hover:fill-darkblue'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 576 512'
                    >
                        <path d='M568.5 142.6l-144-135.1c-9.625-9.156-24.81-8.656-33.91 .9687c-9.125 9.625-8.688 24.81 .9687 33.91l100.1 94.56h-163.4C287.5 134.2 249.7 151 221 179.4C192 208.2 176 246.7 176 288v87.1c0 13.25 10.75 23.1 24 23.1S224 389.3 224 376V288c0-28.37 10.94-54.84 30.78-74.5C274.3 194.2 298.9 183 328 184h163.6l-100.1 94.56c-9.656 9.094-10.09 24.28-.9687 33.91c4.719 4.1 11.06 7.531 17.44 7.531c5.906 0 11.84-2.156 16.47-6.562l144-135.1C573.3 172.9 576 166.6 576 160S573.3 147.1 568.5 142.6zM360 384c-13.25 0-24 10.75-24 23.1v47.1c0 4.406-3.594 7.1-8 7.1h-272c-4.406 0-8-3.594-8-7.1V184c0-4.406 3.594-7.1 8-7.1H112c13.25 0 24-10.75 24-23.1s-10.75-23.1-24-23.1H56c-30.88 0-56 25.12-56 55.1v271.1C0 486.9 25.13 512 56 512h272c30.88 0 56-25.12 56-55.1v-47.1C384 394.8 373.3 384 360 384z' />
                    </svg>
                </button>
            </div>
            <Link href={props.url}>
                <div
                    className='h-80 border-2 border-solid border-red bg-white bg-cover bg-center cursor-pointer'
                    style={{ backgroundImage: `url("${props.projectImage}")` }}
                ></div>
            </Link>
            <div className=' container flex flex-row items-center bg-white p-4  border-2 border-solid border-red'>
                <Link href={props.authorurl}>
                    <div
                        className='border-r-2 border-2 border-solid border-transparent h-14 w-16 rounded-full mr mr-4 bg-slate-600 bg-contain bg-center hover:border-2 hover:border-solid hover:border-yellow  cursor-pointer box-content'
                        style={{ backgroundImage: `url("${props.avatar}")` }}
                    ></div>
                </Link>
                <div className='container flex flex-col '>
                    <Link href={props.url}>
                        <p className='text-darkblue text-2xl text-left font-black cursor-pointer hover:text-red'>
                            {props.projectName}
                        </p>
                    </Link>
                    <Link href={props.authorurl}>
                        <p className='text-red text-left text-sm font-light cursor-pointer hover:text-darkblue'>
                            {props.author}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
