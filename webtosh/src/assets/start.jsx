import React from 'react';

export const Start = () => {
  return (
  <svg className="h-6" viewBox="0 0 24 24"> <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z"
    fill="#FFD700" stroke="#888" /> </svg>
  );
}
export const StartVoid = () => {
  return (
  <svg className="h-6" viewBox="0 0 24 24"> <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z"
    fill="#FFF" stroke="#777" /> </svg>
  );
}

export const DecimalStart = ({value}) =>  {
  let valor = value;
  // Multiplicar el objeto decimal value por 100
  valor= value.times(100);
  return (
    <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">

      <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z"
      fill="url(#partialGradient)" stroke='#888'
      style={{ clipPath: 'url(#clipPath)' }} />
      {/* Define un área de recorte para la estrella parcial */}
      <defs>
        <clipPath id="clipPath">
          <rect x="0" y="0" width="24" height="24" />
        </clipPath>
        {/* Define un degradado para la estrella parcial */}
        <linearGradient id="partialGradient">
          <stop offset={`${valor}%`} stopColor="#FFD700" />
          <stop offset={`${valor}%`} stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}


const testestrellas = () => {
  return (
    <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <defs>
        {/* Define el área de recorte para la mitad derecha de la estrella */}
        <clipPath id="halfClip">
          <rect x="12" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      {/* Usa el área de recorte definida anteriormente en la estrella */}
      <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z"
      fill="#00FF00" stroke="#FFD700"
       style={{clipPath: 'url(#halfClip)'}} />
    </svg>
    // <svg className="h-5 fill-red-600" viewBox="0 0 512.000000 512.000000" >   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    // fill="#aa22aa" stroke="none"> <path d="M2443 4991 c-97 -45 -93 -37 -417 -796 -164 -385 -302 -703 -305  -707 -3 -4 -348 -38 -767 -76 -820 -75 -794 -71 -872 -137 -81 -68 -109 -223  -58 -323 31 -60 43 -72 659 -611 284 -249 517 -458 517 -463 0 -5 -75 -339  -166 -741 -141 -619 -165 -741 -161 -788 9 -99 59 -174 148 -218 68 -34 131  -40 204 -20 22 6 329 184 682 395 353 211 647 384 653 384 6 0 289 -166 628  -369 339 -202 637 -378 661 -391 172 -87 381 27 398 218 5 49 -18 159 -161  789 -91 403 -166 736 -166 741 0 5 246 226 548 489 301 264 561 495 579 513  52 53 73 109 73 193 0 116 -48 195 -150 247 -48 24 -72 27 -890 101 -371 33  -678 64 -681 67 -3 4 -140 322 -304 706 -326 764 -321 753 -421 797 -61 26  -173 26 -231 0z m400 -1054 c165 -385 290 -665 305 -683 35 -39 84 -73 125  -85 17 -5 346 -38 730 -73 384 -36 701 -66 703 -69 2 -2 -236 -215 -530 -473  -430 -376 -540 -478 -562 -517 -52 -95 -52 -90 120 -847 86 -377 156 -689 156  -694 0 -4 -15 2 -34 14 -19 11 -294 176 -611 365 -629 376 -633 377 -740 355  -43 -9 -176 -84 -662 -375 -334 -199 -609 -361 -611 -360 -2 2 67 313 153 691  173 761 172 756 121 851 -22 40 -131 140 -562 518 -294 257 -532 470 -530 473  3 2 317 33 699 67 382 35 714 69 738 76 30 9 61 30 98 69 54 54 59 65 313 660  142 333 265 624 274 648 9 23 19 42 23 42 3 0 131 -294 284 -653z"/>  </g>  </svg>
  
  )
}