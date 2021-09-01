import React, { Fragment } from 'react';
import { sliceEvents, createPlugin } from '@fullcalendar/react';

function FcYearView(e) {
  let segs = sliceEvents(e, true);
  return <Fragment>
    fullcalendar year view
  </Fragment>
}

export default createPlugin({
  views: {
    custom: FcYearView,
  }
});