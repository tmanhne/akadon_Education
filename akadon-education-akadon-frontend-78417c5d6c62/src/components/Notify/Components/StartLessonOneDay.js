import React from 'react';

const StartLessonOneDay = () => {
  return(
    <div className="flex-box px-2 align-items-start">
      <img
        className="image-avatar mr-2"
        width={55}
        height={55}
        alt="subject logo"
        src="http://via.placeholder.com/55x55"
      />
      <div>
        <p className="mb-2 text-wrap">
          Buổi học của bạn sẽ diễn ra vào lúc 17h30 ngày mai (19/06/2020)
        </p>
      </div>
    </div>
  )
}

export default StartLessonOneDay

