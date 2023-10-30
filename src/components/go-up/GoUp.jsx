import { useEffect, useRef } from 'react';
import './GoUp.css'

export default function GoUp(){

    const buttonRef = useRef();

    const handleGoUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
      
        const handleScroll = () => {
            if (window.scrollY > 250) {
                buttonRef.current.classList.add('active');
              } else {
                buttonRef.current.classList.remove('active');
              }
        }
    
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    

    return(
        <div className="go-up" ref={buttonRef} onClick={() => handleGoUp()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="#000" version="1.1" viewBox="0 0 487 487" xmlSpace="preserve" > <path d="M397.7 376.1c20.4 20.4 53.6 20.4 74 0s20.4-53.6 0-74L280.5 110.9c-20.4-20.4-53.6-20.4-74 0L15.3 302.1c-20.4 20.4-20.4 53.6 0 74s53.6 20.4 74 0l154.2-154.2 154.2 154.2z"></path> </svg> 
        </div>
    )
}