import { useEffect } from 'react';
import { DonateButton } from "./donatebutton";

function OCCollective() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://opencollective.com/fullstackhero/banner.js';
        script.async = true;
        const opencollectiveClass = document.querySelector('.opencollective');
        opencollectiveClass.appendChild(script);
        return () => {
            opencollectiveClass.removeChild(script);
        };
    }, []);

    // Rest of your component code here
    return (
        <div>
            <div className='opencollective'>
            </div>
            <div className='opencollectivebutton flex items-center text-center justify-center justify-items-center'>
                <DonateButton />
            </div>
        </div>
    );
}

export { OCCollective }