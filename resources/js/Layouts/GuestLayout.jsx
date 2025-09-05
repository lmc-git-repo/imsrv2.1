import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
// import Logo from '../../imgs/LMC-Full-Logo.png'
// import Logo from '../../imgs/LMC-Full-Logo-White.png'

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div className='w-full lg:w-1/3 flex-row items-center justify-center'>
                <div className='flex justify-center'>
                    {/* <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link> */}
                    {/* <img src={Logo} alt="LMC-full Logo" style={{width: '400px'}} /> */}
                    <img src="/imgs/LMC-Full-Logo-White.png" alt="LMC-full Logo White" style={{width: '400px'}} loading="lazy" />
                </div>

                <div className='flex justify-center'>
                    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-slate-800 shadow-md overflow-hidden sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
