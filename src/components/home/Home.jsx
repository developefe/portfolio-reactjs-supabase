import React, { useEffect, useState } from "react";
import EntranceAni from "../entrance-ani/EntranceAni";
import Header from "../header/Header";
import Entrance from "../entrance/Entrance";
import ProjectList from "../project-list/ProjectList";
import GoUp from "../go-up/GoUp";
import Footer from "../footer/Footer";
import supabase from "../../supabaseClient";
import Loader from "../Loader/Loader";

export default function Home({ lang }) {
  const [siteInfos, setSiteInfos] = useState();
  const [loader, setLoader] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const fetchInfos = async (apiEnd) => {
    if (!isFirst) {
        setLoader(true)
    }
    const { data, error } = await supabase.from(apiEnd).select();
    console.log("fetchInfos");

    if (error) {
      console.log(error);
    }
    if (data) {
        setTimeout(() => {
            setLoader(false)
            setIsFirst(false)
        }, 650);
        setSiteInfos(data);
        console.log(data);

        // console.log('siteInfos:', data);
    }
  };

  useEffect(() => {
    const apiEnd =
      lang == "tr" ? "titles-and-contact" : "titles-and-contact-en";

    fetchInfos(apiEnd);
  }, [lang]);
  return (
    <>
        {loader && <Loader />}
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
        <ProjectList lang={lang} />
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
