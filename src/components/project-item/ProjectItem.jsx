import { useEffect, useRef, useState } from 'react';
import ProjectImage from '../../assets/default_project.jpg';
import './ProjectItem.css'


export default function ProjectItem({project}) {


    const projectItem = useRef([]);
    var projectClass = project.projectName;    

    useEffect(() => {
        setTimeout(() => {
            projectItem.current.style.scale = 1;
        });
    }, [])
    
    // Change Turkish chars with eng chars for prevent false query filter
    var trMap = {
        'ç':'c',
        'Ç':'C',
        'ğ':'g',
        'Ğ':'G',
        'ş':'s',
        'Ş':'S',
        'ü':'u',
        'Ü':'U',
        'ı':'i',
        'İ':'I',
        'ö':'o',
        'Ö':'O'
    };

    for (var key in trMap) {
        var regExp = new RegExp(key, 'g');
        project.projectType = project.projectType.replace(regExp, trMap[key]);
        projectClass = projectClass.replace(regExp, trMap[key]);
    }
    
    project.projectType = project.projectType.replace(/[^-a-zA-Z0-9\s]+/ig, '')
    .replace(/\s/g, "-")
    .replace(/[-]+/g, "-")
    .toLowerCase();

    projectClass = projectClass.replace(/[^-a-zA-Z0-9\s]+/ig, '')
    .replace(/\s/g, "-")
    .replace(/[-]+/g, "-")
    .toLowerCase();


    // Fallback if url don't includes https:// or http://
    function formatUrl(url) {
        if (url && url != null && url != undefined) {
            if (!url?.startsWith('http')) {
                url = "https://" + url;
            }
        }
        
        return url;
    }
      
    project.projectDesign = formatUrl(project.projectDesign);
    project.projectWebsite = formatUrl(project.projectWebsite);

    return(
        <div className={`item-container ${project.projectType +' '+ projectClass}`}>
            <div className="project-item" style={{scale: 0}} ref={projectItem}>
                {project.projectStatus === 'Tamamlandı' ? <span className="status">Tamamlandı</span> : <span className="status warning">Devam ediyor</span>}
                <div className="top">
                    <p className="name">
                        {project.projectName}
                    </p>
                    <div className="links">
                        {project.projectDesign && (
                            <a href={project.projectDesign} className="link-item" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21" > <path fill="#B8D4E7" fillRule="evenodd" d="M3.719 4.667c0-1.974 1.6-3.573 3.573-3.573h3.573V8.24H7.292a3.573 3.573 0 01-3.573-3.573zm3.573-2.26a2.26 2.26 0 000 4.52h2.26v-4.52h-2.26z" clipRule="evenodd" ></path> <path fill="#B8D4E7" fillRule="evenodd" d="M16.698 4.667c0-1.974-1.6-3.573-3.573-3.573H9.552V8.24h3.573c1.973 0 3.573-1.6 3.573-3.573zm-3.573-2.26a2.26 2.26 0 110 4.52h-2.26v-4.52h2.26z" clipRule="evenodd" ></path> <path fill="#B8D4E7" fillRule="evenodd" d="M16.698 10.5a3.573 3.573 0 10-7.146 0 3.573 3.573 0 007.146 0zm-3.573-2.26a2.26 2.26 0 110 4.52 2.26 2.26 0 010-4.52z" clipRule="evenodd" ></path> <path fill="#B8D4E7" fillRule="evenodd" d="M3.719 10.5c0-1.973 1.6-3.573 3.573-3.573h3.573v7.146H7.292A3.573 3.573 0 013.719 10.5zm3.573-2.26a2.26 2.26 0 000 4.52h2.26V8.24h-2.26z" clipRule="evenodd" ></path> <path fill="#B8D4E7" fillRule="evenodd" d="M3.719 16.334c0-1.974 1.6-3.573 3.573-3.573h3.573v3.573a3.573 3.573 0 11-7.146 0zm3.573-2.26a2.26 2.26 0 102.26 2.26v-2.26h-2.26z" clipRule="evenodd" ></path> </svg>
                                <div className="tooltip">Prototipi incele</div>
                            </a>
                        )}
                        {project.projectWebsite && (
                            <a href={project.projectWebsite} className="link-item" target="_blank">
                                {project.projectStatus === 'Tamamlandı' ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21" > <g stroke="#B8D4E7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" clipPath="url(#clip0_43_703)" > <path d="M10.5 19.25a8.75 8.75 0 100-17.5 8.75 8.75 0 000 17.5z"></path> <path d="M4.375 10.5h12.25m-4.253-6.125A13.388 13.388 0 0114 10.5a13.388 13.388 0 01-1.628 6.125M8.628 4.375A13.387 13.387 0 007 10.5c.045 2.158.61 4.257 1.628 6.125"></path> </g> <defs> <clipPath id="clip0_43_703"> <path fill="#fff" d="M0 0H21V21H0z"></path> </clipPath> </defs> </svg>
                                        <div className="tooltip">Canlı siteyi incele</div>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21" > <path stroke="#B8D4E7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.75 17.5h.01" ></path> <path stroke="#B8D4E7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M1.75 14.088A4.375 4.375 0 015.162 17.5M1.75 10.544A7.876 7.876 0 018.706 17.5M1.75 7V5.25A1.75 1.75 0 013.5 3.5h14a1.75 1.75 0 011.75 1.75v10.5a1.75 1.75 0 01-1.75 1.75h-5.25" ></path> </svg>
                                        <div className="tooltip">Demo siteyi incele</div>
                                    </>
                                )}
                            </a>
                        )}
                    </div>
                </div>
                <div className="bottom">
                    <div className="img" style={{backgroundImage: `url(${project.projectImage || ProjectImage})`}}></div>
                </div>
            </div>
        </div>
    )
}