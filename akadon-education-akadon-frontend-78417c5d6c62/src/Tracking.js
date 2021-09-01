import React, {useEffect} from "react"
import {useLocation} from "react-router-dom";

function usePageViews() {
    let location = useLocation();
    useEffect(
      () => {
        let dataLayerObject = {
            'event': 'pageView',
            'page': location.pathname + location.search,
            'url' : document.location.href,
        }
        let dataLayer = window.dataLayer = window.dataLayer || [];
        dataLayer.push(dataLayerObject);
      },
      [location]
    )
  }

const Tracking = () => {
    return (
        <>
          {usePageViews()}
        </>
    )
}

export default Tracking