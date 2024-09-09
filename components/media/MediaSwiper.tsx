"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import MediaCard from "./MediaCard";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import 'swiper/css/navigation';
import 'swiper/css';
import { A11y, Navigation } from 'swiper/modules';

function MediaSwiper() {
    return (
        <div className="relative">
            <Swiper
             modules={[Navigation, A11y]}
                spaceBetween={10}
                slidesPerView={4.5}
                navigation={{
                    prevEl: '.swiper-button-custom-prev',
                    nextEl: '.swiper-button-custom-next',
                }}
                  className="!p-0 !m-0"
            >
                <SwiperSlide><MediaCard /></SwiperSlide>
                <SwiperSlide><MediaCard /></SwiperSlide>
                <SwiperSlide><MediaCard /></SwiperSlide>
                <SwiperSlide><MediaCard /></SwiperSlide>
                <SwiperSlide><MediaCard /></SwiperSlide>
                <SwiperSlide><MediaCard /></SwiperSlide>
            </Swiper>
            <div className='flex justify-end mt-4'>
                <div className="swiper-button-custom-prev flex items-center justify-center w-5 h-5 p-4 text-white cursor-pointer transition duration-300">
                    <KeyboardArrowLeftIcon fontSize="medium" />
                </div>
                <div className="swiper-button-custom-next flex items-center justify-center w-5 h-5 p-4 text-white cursor-pointer transition duration-300">
                    <KeyboardArrowRightIcon fontSize="medium" />
                </div>
            </div>
        </div>
    )
}

export default MediaSwiper;
