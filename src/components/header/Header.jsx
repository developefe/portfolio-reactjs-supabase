import './Header.css';
import { useEffect, useRef, useState } from 'react';

export default function Header() {

    const leftSide = useRef();
    const rightSide = useRef();

    const buttonClick = () => {
        leftSide.current.classList.toggle('active');
        rightSide.current.classList.toggle('active');
        leftSide.current.classList.add('pointer-none');
        setTimeout(() => {
            leftSide.current.classList.remove('pointer-none');
        }, 700);
    }

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 1) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return(
        <div className={`header ${isScrolled ? 'fixed-active' : ''}`}>
            <div className="header-container">
                <div className="img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="79" height="22" fill="none" viewBox="0 0 79 22" > <path fill="#B8D4E7" d="M3.01 6.63v7.95c0 2.52 1.47 4.2 3.69 4.2 2.28 0 3.75-1.68 3.75-4.2V6.63h2.67v8.16c0 3.9-2.55 6.48-6.42 6.48-3.84 0-6.36-2.58-6.36-6.48V6.63h2.67zm17.1 0V21h-2.67V6.63h2.67zm-1.35-2.49c-.9 0-1.65-.75-1.65-1.65 0-.9.75-1.65 1.65-1.65.9 0 1.65.75 1.65 1.65 0 .9-.75 1.65-1.65 1.65z" ></path> <path fill="#2C53B5" d="M34.864 10.17c-.96-.9-2.22-1.41-3.78-1.41-2.85 0-4.83 2.22-4.83 5.04 0 2.79 1.98 5.07 4.8 5.07 1.56 0 2.91-.51 3.87-1.47l1.38 1.95c-1.14 1.23-3.15 2.01-5.34 2.01-4.2 0-7.38-3.39-7.38-7.56s3.21-7.53 7.41-7.53c2.31 0 4.2.78 5.4 2.01l-1.53 1.89zm6.84 2.55V21h-2.67V6.63h2.67v1.8c.78-1.32 2.01-2.16 3.6-2.16.9 0 1.68.21 2.19.63l-1.11 2.49c-.48-.33-1.17-.57-1.86-.57-1.74 0-2.82 1.5-2.82 3.9zm13.669 8.64c-4.38 0-7.53-3.39-7.53-7.56s3.03-7.53 7.11-7.53c4.02 0 7.08 3.21 7.08 7.26 0 .36-.03.75-.09.96h-11.4c.3 2.58 2.19 4.5 4.92 4.5 1.62 0 3.06-.63 4.02-1.59l1.41 1.83c-1.17 1.26-3.21 2.13-5.52 2.13zm-.39-12.81c-2.34 0-3.99 1.77-4.38 4.17h8.7c-.42-2.67-2.07-4.17-4.32-4.17zM76.206 21v-2.25c-1.11 1.59-2.85 2.61-5.04 2.61-3.9 0-6.96-3.21-6.96-7.56 0-4.26 2.94-7.53 6.96-7.53 2.19 0 3.93.96 5.04 2.52V6.63h2.67V21h-2.67zm-4.65-2.13c2.7 0 4.65-2.28 4.65-5.07 0-2.82-1.95-5.04-4.65-5.04s-4.68 2.22-4.68 5.04c0 2.79 1.98 5.07 4.68 5.07z" ></path> </svg>
                </div>
                <div className="social">
                    <div className="left" ref={leftSide} onClick={buttonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 15 15" > <path stroke="#B8D4E7" strokeLinecap="round" strokeWidth="1.15" d="M2.291 4.435l3.911 2.704a2.293 2.293 0 002.596 0l3.911-2.704M1.332 10.099a8.293 8.293 0 010-4.127c.455-1.773 1.909-3.145 3.753-3.54l.307-.066a10.064 10.064 0 014.216 0l.307.066c1.844.395 3.298 1.767 3.753 3.54a8.293 8.293 0 010 4.127c-.455 1.774-1.909 3.145-3.753 3.54l-.307.066a10.062 10.062 0 01-4.216 0l-.307-.066c-1.844-.395-3.298-1.766-3.753-3.54z" ></path> </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none" viewBox="0 0 17 16" > <path stroke="#B8D4E7" strokeWidth="1.15" d="M10.79 14.58a5.704 5.704 0 001.977 0c1.049-.184 1.894-.89 2.186-1.822l.061-.198c.065-.205.097-.418.097-.632 0-.942-.843-1.706-1.882-1.706h-2.902c-1.04 0-1.883.764-1.883 1.707 0 .213.033.426.097.631l.062.198c.291.933 1.137 1.638 2.186 1.822zm0 0a11.141 11.141 0 01-8.926-8.925m0 0a5.707 5.707 0 010-1.977c.185-1.05.89-1.895 1.822-2.186l.198-.062c.206-.064.418-.097.632-.097.942 0 1.706.843 1.706 1.883v2.902C6.222 7.158 5.458 8 4.516 8c-.214 0-.426-.033-.632-.097l-.198-.061C2.754 7.55 2.05 6.705 1.864 5.655z" ></path> </svg>
                        <div className="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="active" viewBox="0 0 16 16" > <path fill="#fff" d="M6.043 2.38a10.094 10.094 0 014.136 0l.285.06a5.177 5.177 0 012.917 1.73c.117.141.078.344-.077.447L9.002 7.465a1.626 1.626 0 01-1.782 0l-4.3-2.848c-.156-.103-.195-.306-.078-.446a5.177 5.177 0 012.917-1.73l.285-.06zM2.488 5.529c-.18-.12-.43-.051-.499.146a4.69 4.69 0 00-.102.337 7.82 7.82 0 000 3.978c.47 1.789 1.97 3.172 3.871 3.57l.285.06c1.362.286 2.774.286 4.136 0l.285-.06c1.902-.398 3.402-1.781 3.871-3.57a7.82 7.82 0 000-3.978 4.664 4.664 0 00-.102-.337c-.068-.197-.319-.266-.499-.146l-4.138 2.74a2.71 2.71 0 01-2.97 0l-4.138-2.74z" ></path> </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17" > <path fill="#fff" d="M5.032 2.125a2.36 2.36 0 00-.704.108l-.174.054C3.137 2.605 2.4 3.513 2.209 4.6a5.527 5.527 0 00.014 1.99 10.325 10.325 0 008.262 8.201 5.527 5.527 0 001.915 0c1.087-.191 1.995-.928 2.313-1.945l.054-.174c.072-.229.108-.466.108-.704 0-1.147-1.01-1.997-2.152-1.997h-2.562c-1.142 0-2.151.85-2.151 1.997 0 .238.036.475.107.704l.055.174c.018.06.04.118.062.176a9.354 9.354 0 01-4.256-4.256c.058.023.116.044.176.062l.174.055c.229.071.466.107.704.107 1.148 0 1.998-1.01 1.998-2.15V4.277c0-1.142-.85-2.152-1.997-2.152z" ></path> </svg>
                        </div>
                    </div>
                    <div className="right" ref={rightSide}>
                        <a href="#!">hello@uicrea.com</a>
                        <a href="#!">0544 334 0373</a>
                    </div>
                </div>
            </div>
        </div>
    )  
};