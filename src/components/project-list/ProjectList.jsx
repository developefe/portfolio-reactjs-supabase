import * as React from 'react';
import { useEffect, useState, useRef, useCallback} from 'react';
import ProjectItem from '../project-item/ProjectItem'
import supabase from '../../supabaseClient';
import './ProjectList.css';
import Isotope from "isotope-layout";
import $ from 'jquery';

export default function ProjectList() {

    // Project Item
    const [projects, setProjects] = useState(null)
    const [projectsCatchErr, setProjectsCatchErr] = useState(null)


    // Project Type
    const [projectType, setProjectType] = useState(null);
    const lineRef = useRef()
    const projectsRef = useRef([]);

    // Search and animation
    const filterContainer = useRef();
    const searchInput = useRef();

    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState('*')
    const [selectedFilter, setSelectedFilter] = useState(0)

    // Keeping project type for preventing duplication
    const processedTypes = [];

    // Combining two functions into one
    const handleFilterLink = (key, index) => {
        setFilterKey(key);
        setSelectedFilter(index);

        let left = projectsRef.current[index].offsetLeft,
            width = projectsRef.current[index].offsetWidth;

        lineRef.current.style.left = left+'px';
        lineRef.current.style.width = width+'px';

    }

    // Give first elements width to line
    useEffect(() => {
        lineRef.current.style.width = projectsRef?.current[0]?.offsetWidth+'px';
    }, [projectType])
    

    // Create isotope
    useEffect(() => {
        console.log('isotope');
        isotope.current = new Isotope('.list', {
            itemSelector: '.item-container',
            layoutMode: 'fitRows',
        });

        // return () => isotope.current.destroy();
    }, [projects])

    useEffect(() => {
        filterKey === '*'
        ? isotope.current.arrange({filter: `*`})
        : isotope.current.arrange({filter: `.${filterKey}`});
    }, [filterKey])

    // Infinite scroll
    const [scrollOver, setScrollOver] = useState(false);
    const [page, setPage] = useState(2);
    const [projectCount, setProjectCount] = useState(null)

    const fetchProjectCount = async () => {
        const {data, error} = await supabase
            .from('project-list')
            .select('id')

        if (error) {
            setProjectCount('projeler çekilemedi')
            console.log(error);
        }
        if (data) {
            setProjectCount(data);
            console.log('proje id: ', data);
        }
    }

    const fetchProjects = async (from, to) => {
        const {data, error} = await supabase
            .from('project-list')
            .select()
            .range(from, to);

        if (error) {
            setProjects(null)
            setProjectsCatchErr('Projeler yüklenirken bir hata oluştu, lütfen daha sonra tekrar deneyiniz (FETCHERR-01)')
            console.log(error);
        }
        if (data) {
            setProjects(data);
            console.log(data);
            setProjectsCatchErr(null);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (projectsRef?.current[0]?.classList.value.includes('active') && !filterContainer.current.classList.value.includes('search')) {
                if (((window.scrollY + window.innerHeight) > (document.documentElement.offsetHeight  - 150)) && !scrollOver) {
                    if ((projectCount.length - page) > -1) {
                        console.log('handle scroll çalıştı');
                        setPage(page+2);            
                        fetchProjects(0,page)
                        setScrollOver(true);
                    }
                } else if ((window.scrollY + window.innerHeight) < (document.documentElement.offsetHeight  - 150)) {
                    setScrollOver(false);
                }
                };
            }

        window.addEventListener('scroll', handleScroll);
    
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollOver, projectCount]);
    

    useEffect(() => {

        fetchProjectCount();
        fetchProjects(0,1);

        const fetchProjectType = async () => {
            const {data, error} = await supabase
                .from('project-list')
                .select('projectType')

            if (error) {
                console.log(error);
                setProjectsCatchErr('Proje kategorileri yüklenirken bir hata oluştu, lütfen daha sonra tekrar deneyiniz (FETCHERR-02)')
            }
            if (data) {
                data.unshift({'projectType': 'tümü'});
                console.log(data);
                setProjectType(data)
                setProjectsCatchErr(null)
            }
        }

        fetchProjectType();
    }, []);

    // Open Search
    const handleSearch = () => {
        filterContainer.current.classList.add('search');

        setTimeout(() => {
            searchInput.current.focus();
        }, 300);
    }

    useEffect(() => {
        
        const checkSearchIsActive = (e) => {

            if (filterContainer.current.classList.value.includes('search') && e && e.key === 'Escape') {
                handleFilter();
            }

        }

        window.addEventListener('keydown', (e) => checkSearchIsActive(e))

        return () => {
        window.removeEventListener('keydown', (e) => checkSearchIsActive(e))
        }
    }, [])
    

    // Open Filter Buttons
    const handleFilter = () => {
        filterContainer.current.classList.remove('search');
        
        setTimeout(() => {
            searchInput.current.value = '';
        }, 300);
    }
    
    // Custom search
    var qsVals = [];

    const handleSearchInput = (val) => {
        console.log(val);

        if (val.length > 0) {
            projectType.map((project, index) => {
                if (project?.projectType.includes(val)) {
                    qsVals.push('.'+projectType[index].projectType);
                }
            });

            console.log(qsVals);

            if (qsVals.length > 0) {
                let qsQuery = qsVals.join(', ').substring(1);
                console.log(qsQuery);
        
                setFilterKey(qsQuery)
            }else {
                setFilterKey('noelementselected')
            }
    
        }else {
            setFilterKey('*')
        }
    }
    
    return(
        <div className="project-list">
            <div className="top">
                <div className="filter-active" ref={filterContainer}>
                    <div className="filter-links">
                        {projectType?.map((type, index) => {
                            if (processedTypes.includes(type?.projectType)) {
                                return null;
                            }

                            processedTypes.push(type?.projectType);
                            
                            if (index === 0) {
                                return (
                                    <div className="item-holder" style={{transitionDelay: '0.'+index+'s'}} key={index}>
                                        <div className={selectedFilter === index ? 'link-item active' : 'link-item'} 
                                            onClick={() => handleFilterLink('*', index)} 
                                            ref={(element) => (projectsRef.current[index] = element)}>
                                            {type?.projectType}
                                        </div>
                                    </div>
                                );
                            }else {
                                return (
                                    <div className="item-holder" style={{transitionDelay: '0.'+index+'s'}} key={index}>
                                        <div className={selectedFilter === index ? 'link-item active' : 'link-item'} 
                                            onClick={() => handleFilterLink(type?.projectType, index)} 
                                            ref={(element) => (projectsRef.current[index] = element)}>
                                            {type?.projectType}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="search-input">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 23 23" > <path fill="#228ED7" d="M20.805 19.445l-2.712-2.703a9.123 9.123 0 10-1.35 1.351l2.702 2.712a.96.96 0 001.644-.68.96.96 0 00-.284-.68zM3.833 11.02a7.188 7.188 0 1114.375 0 7.188 7.188 0 01-14.375 0z" ></path> </svg>
                        <input type="text" onInput={() => handleSearchInput(searchInput.current.value)} ref={searchInput} placeholder='Proje ismiyle hızlı arama yapabilirsiniz...'/>
                    </div>
                    <div className="search-button">
                        <svg onClick={() => handleSearch()} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 23 23" > <path fill="#228ED7" d="M20.805 19.445l-2.712-2.703a9.123 9.123 0 10-1.35 1.351l2.702 2.712a.96.96 0 001.644-.68.96.96 0 00-.284-.68zM3.833 11.02a7.188 7.188 0 1114.375 0 7.188 7.188 0 01-14.375 0z" ></path> </svg>
                        <span onClick={() => handleFilter()}>ESC</span>
                    </div>
                </div>
                <span className="line" ref={lineRef}></span>
            </div>
            <div className="list">
                {projects?.map(project => (
                    <ProjectItem 
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
        </div>
    )
}