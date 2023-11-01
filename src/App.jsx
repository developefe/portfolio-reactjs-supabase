import { useEffect, useState } from 'react';
import './App.css';
import Entrance from './components/entrance/Entrance';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import ProjectList from './components/project-list/ProjectList';
import supabase from './supabaseClient';
import GoUp from './components/go-up/GoUp';
import EntranceAni from './components/entrance-ani/EntranceAni';

function App() {

    const [siteInfos, setSiteInfos] = useState();

    useEffect(() => {
        const fetchInfos = async () => {
            const {data, error} = await supabase
                .from('titles-and-contact')
                .select();

            if (error) {
                console.log(error);
            }
            if (data) {
                setSiteInfos(data)
                // console.log('siteInfos:', data);
            }
        }

        fetchInfos();
    }, []);

    return (
        <>
            <EntranceAni />
            <div className="main">
                <Header 
                    tel={siteInfos && siteInfos[0]?.tel}
                    mail={siteInfos && siteInfos[0]?.mail}
                />
                <Entrance 
                    title={siteInfos && siteInfos[0]?.title}
                    subTitle={siteInfos && siteInfos[0]?.subTitle}
                />
                <ProjectList />
                <GoUp />
                <Footer
                    tel={siteInfos && siteInfos[0]?.tel}
                    mail={siteInfos && siteInfos[0]?.mail}
                    footerSlogan={siteInfos && siteInfos[0]?.footerSlogan}
                />
            </div>    
        </>
    );
}

export default App;