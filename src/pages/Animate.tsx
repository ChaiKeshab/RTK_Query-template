import { useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'

function Section({ children }: { children: ReactNode }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <section ref={ref} className=' border-red-700 border overflow-x-hidden'>
            <span className={`${isInView ? "opacity-100 left-0" : "opacity-0 left-[100px]"} w-fit relative transition-all duration-500`} >
                {children}
            </span>
        </section>
    );
}

const Animate = () => {

    const arr = Array.from({ length: 100 }, (_, i) => i + 1);
    const data = arr.map((content, index) => (
        <Section key={index}>
            <div className='p-2'>content no: {content}</div>
        </Section>
    ))

    return (
        <div>
            <div>Animate</div>
            <div className='p-6 space-y-2'>{data}</div>
        </div>
    )
}

export default Animate