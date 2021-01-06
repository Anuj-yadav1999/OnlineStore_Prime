import React from 'react'
import './Advt.css'

function Advt() {
    return (
        <div className='advt'>
            <div className='advt__backgroud'>
                <div className='advt__textCover'>
                    <p className='advt__text1'>Best Selling Headphones</p>
                    <p className='advt__text'>Get Product access to 5000+ and much more</p>
                    <p className='advt__text'>And World Class Products</p>
                </div>
            </div>
            <div className='advt__imgBox'>
                    <img className='advt__img' src={'https://image.freepik.com/free-photo/excited-happy-man-listening-cristmas-songs-as-seeing-friend-street-saying-hi-friendly-waving-left-hand-hello-gesture-wearing-headphones-enjoy-music-hold-smartphone-smiling-blue-background_1258-7637.jpg'} alt='' />
            </div>
        </div>
    )
}

export default Advt
