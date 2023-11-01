import * as React from 'react';
import { useEffect, useState, useRef, useCallback} from 'react';
import ProjectItem from '../project-item/ProjectItem'
import supabase from '../../supabaseClient';
import './ProjectList.css';
import Isotope from "isotope-layout";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import $ from 'jquery';

export default function ProjectList() {

    // Project Item
    const [projects, setProjects] = useState(null)
    const [projectsCatchErr, setProjectsCatchErr] = useState(null)
    const [projectNameMemo, setProjectNameMemo] = useState(null);

    // Project Type
    const [projectType, setProjectType] = useState(null);
    const [projectTypeQuery, setProjectTypeQuery] = useState(null);
    const lineRef = useRef()
    const projectsRef = useRef([]);

    // Search and animation
    const filterContainer = useRef();
    const searchInput = useRef();

    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState('*')
    const [selectedFilter, setSelectedFilter] = useState(0)

    // Stashing project type for preventing duplication
    const processedTypes = [];

    // For first animation
    const [count, setCount] = useState(0);
    const [keepCount, setKeepCount] = useState(true);

    useEffect(() => {
        if (keepCount === true) {
            var interval = setInterval(() => {
              setCount((prevCount) => prevCount + 1);
            }, 1000);
        }else {
            clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
    }, [keepCount]);
    
    useEffect(() => {
        // console.log('interval:', count);
    }, [count])
    

    // Combining two functions into one
    const handleFilterLink = (key, index) => {
        setFilterKey(key);
        setSelectedFilter(index);

        // For line animation
        const wrapper = document.querySelector('.swiper-wrapper');
        const wrapperStyle = window.getComputedStyle(wrapper);
        const calcWrapper = wrapperStyle.transform.toString().split(", ")[4];

        // filterContainer.current.style.pointerEvents = 'none';
        // lineRef.current.style.opacity = 1;
        setTimeout(() => {
            lineRef.current.classList.add('moving');
            let left = (parseInt(projectsRef.current[index].parentElement.parentElement.offsetLeft) + parseInt(calcWrapper)),
                width = projectsRef.current[index].offsetWidth;
    
            // console.log(left, width);
    
            lineRef.current.style.left = left+'px';
            lineRef.current.style.width = width+'px';
        }, 1);


        setTimeout(() => {
            // lineRef.current.style.opacity = 0;
            lineRef.current.classList.remove('moving');
            // filterContainer.current.style.pointerEvents = 'all';
        }, 300);

    }

    // Give first elements width to line
    useEffect(() => {
        lineRef.current.style.width = projectsRef?.current[0]?.offsetWidth+'px';
    }, [projectType])
    

    // Create isotope
    useEffect(() => {
        // console.log('isotope');
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
    const [page, setPage] = useState(5);
    const [projectCount, setProjectCount] = useState(null)

    const fetchProjectCount = async () => {
        const {data, error} = await supabase
            .from('project-list')
            .select('id')

        if (error) {
            setProjectCount('projeler çekilemedi')
            // console.log(error);
        }
        if (data) {
            setProjectCount(data);
            // console.log('proje id: ', data);
        }
    }

    const doAnimation = () => {
        // For reaching a div in different component I decided to use jquery as a shortcut
        // console.log('keepCount2', keepCount);
        // console.log('count2', count);
        $('.ani-bg').addClass('finish');
        setTimeout(() => {
            $('.ani-bg').addClass('disappear');
            setTimeout(() => {
                $('.main').addClass('show');
                $('body').removeClass('overflow-hidden');   
                setCount(-1)
                setKeepCount(false)
            }, 700);
        }, 1200);
    }

    const fetchProjects = async (from, to) => {
        const {data, error} = await supabase
            .from('project-list')
            .select()
            .range(from, to);

        if (error) {
            setProjects(null)
            setProjectsCatchErr('Projeler yüklenirken bir hata oluştu, lütfen daha sonra tekrar deneyiniz (FETCHERR-01)')
            // console.log(error);
        }
        if (data) {
            setProjects(data);
            // console.log(data);

            // console.log('keepCount', keepCount);
            // console.log('count', count);
            if (keepCount == true) {
                if (count && count > 3) {
                    doAnimation();
                }else if (count < 0) {
                    return;
                }else {
                    setTimeout(() => {
                        doAnimation()
                    }, 2000);
                }
            }

            setProjectsCatchErr(null);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (projectsRef?.current[0]?.classList.value.includes('active') && !filterContainer.current.classList.value.includes('search')) {
                if (((window.scrollY + window.innerHeight) > (document.documentElement.offsetHeight  - 150)) && !scrollOver) {
                    if ((projectCount?.length - page) > -1) {
                        // console.log('handle scroll çalıştı');
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
        fetchProjects(0,3);

        const fetchProjectType = async () => {
            const {data, error} = await supabase
                .from('project-list')
                .select('projectType')

            if (error) {
                // console.log(error);
                setProjectsCatchErr('Proje kategorileri yüklenirken bir hata oluştu, lütfen daha sonra tekrar deneyiniz (FETCHERR-02)')
            }
            if (data) {
                var oldData = JSON.parse(JSON.stringify(data));

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
                var datas = data;

                datas = datas.map(item => {
                    for (var key in trMap) {
                        var regExp = new RegExp(key, 'g');
                        item.projectType = item.projectType.replace(regExp, trMap[key]);
                    }
                
                    return {
                        ...item,
                        projectType: item.projectType
                            .replace(/[^-a-zA-Z0-9\s]+/ig, '')
                            .replace(/\s/g, "-")
                            .replace(/[-]+/g, "-")
                            .toLowerCase()
                    };
                });
        
                // console.log('projectType data:', oldData);
                // console.log('projectTypeQuery data:', data);
                data.unshift({'projectType': 'tümü'});
                oldData.unshift({'projectType': 'tümü'});
                
                setProjectType(oldData)
                setProjectTypeQuery(datas)

                setProjectsCatchErr(null)
            }
        }

        fetchProjectType();

        const fetchProjectNames = async () => {
            const {data, error} = await supabase
                .from('project-list')
                .select('projectName')

            if (error) {
                // console.log(error);
            }
            if (data) {
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

                var datas = data;

                datas = datas.map(item => {
                    for (var key in trMap) {
                        var regExp = new RegExp(key, 'g');
                        item.projectName = item.projectName.replace(regExp, trMap[key]);
                    }
                
                    return {
                        ...item,
                        projectName: item.projectName
                            .replace(/[^-a-zA-Z0-9\s]+/ig, '')
                            .replace(/\s/g, "-")
                            .replace(/[-]+/g, "-")
                            .toLowerCase()
                    };
                });
        
                // console.log('projectNameMemo', datas);
                
                setProjectNameMemo(datas)
            }
        }

        fetchProjectNames();
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
            if (e && e.key === 'Escape') {
                if (filterContainer.current.classList.value.includes('search')) {
                    handleFilter();
                }
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

    const handleSearchInput = (val) => {
        // console.log(val);

        if (val.length > 0) {

            // Replace Turkish chars with eng chars
            for (var key in trMap) {
                var regExp = new RegExp(key, 'g');
                val = val.replace(regExp, trMap[key]);
            }
            
            val = val.replace(/[^-a-zA-Z0-9\s]+/ig, '')
            .replace(/\s/g, "-")
            .replace(/[-]+/g, "-")
            .toLowerCase();

            // console.log('query val:', val);

            projectTypeQuery.map((project, index) => {
                if (project?.projectType.includes(val)) {
                    qsVals.push('.'+projectTypeQuery[index].projectType);
                }
            });

            projectNameMemo.map((project, index) => {
                if (project?.projectName.includes(val)) {
                    qsVals.push('.'+projectNameMemo[index].projectName);
                }
            });

            if (qsVals.length > 0) {
                let qsQuery = qsVals.join(', ').substring(1);
 
                // console.log('qsQuery: ', qsQuery);
        
                setFilterKey(qsQuery)
            }else {
                setFilterKey('noelementselected')
            }
    
        }else {
            setFilterKey('*')
        }
    }
    
    return(
        <>   
            <div className="project-list">
                <div className="top">
                    <div className="filter-active" ref={filterContainer}>
                        <div className="filter-links">
                        <Swiper
                            slidesPerView={'auto'}
                            spaceBetween={0}
                            modules={[FreeMode, Pagination]}
                            className="filter-link-swiper"
                        >
                                {projectType?.map((type, index) => {
                                    if (processedTypes.includes(type?.projectType)) {
                                        return null;
                                    }

                                    processedTypes.push(type?.projectType);
                                    
                                    if (index === 0) {
                                        return (
                                            <SwiperSlide>
                                                <div className="item-holder" style={{transitionDelay: '0.'+index+'s'}} key={index}>
                                                    <div className={selectedFilter === index ? 'link-item active' : 'link-item'} 
                                                        onClick={() => handleFilterLink('*', index)} 
                                                        ref={(element) => (projectsRef.current[index] = element)}>
                                                        {type?.projectType.toUpperCase().replace(/[I]+/g, 'İ')}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    }else {
                                        return (
                                            <SwiperSlide>
                                                <div className="item-holder" style={{transitionDelay: '0.'+index+'s'}} key={index}>
                                                    <div className={selectedFilter === index ? 'link-item active' : 'link-item'} 
                                                        onClick={() => handleFilterLink(projectTypeQuery[index-1].projectType, index)} 
                                                        ref={(element) => (projectsRef.current[index] = element)}>
                                                        {type?.projectType.toUpperCase().replace(/[I]+/g, 'İ')}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    }
                                })}
                            </Swiper>
                        </div>
                        <div className="search-input">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 23 23" > <path fill="#228ED7" d="M20.805 19.445l-2.712-2.703a9.123 9.123 0 10-1.35 1.351l2.702 2.712a.96.96 0 001.644-.68.96.96 0 00-.284-.68zM3.833 11.02a7.188 7.188 0 1114.375 0 7.188 7.188 0 01-14.375 0z" ></path> </svg>
                            <input type="text" onInput={() => handleSearchInput(searchInput.current.value)} ref={searchInput} placeholder='Proje ismiyle hızlı arama yapabilirsiniz...'/>
                        </div>
                        <div className="search-button">
                            <svg onClick={() => handleSearch()} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 23 23" > <path fill="#228ED7" d="M20.805 19.445l-2.712-2.703a9.123 9.123 0 10-1.35 1.351l2.702 2.712a.96.96 0 001.644-.68.96.96 0 00-.284-.68zM3.833 11.02a7.188 7.188 0 1114.375 0 7.188 7.188 0 01-14.375 0z" ></path> </svg>
                            <span onClick={() => handleFilter()}>ESC</span>
                            <span className="cross" onClick={() => handleFilter()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24" > <path stroke="#7993C7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 5L5 19M5 5l4.5 4.5M12 12l7 7" ></path> </svg>
                            </span>
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
        </>
    )
}