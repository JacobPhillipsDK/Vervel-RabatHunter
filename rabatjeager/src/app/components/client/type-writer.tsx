
"use client";

import Typewriter from 'typewriter-effect';


export default function typeWriter() {
    return (
        <Typewriter
            options={{
                strings: ['Netto', 'Føtex', 'Bilka', 'Salling'],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
            }}
        />
    );
}