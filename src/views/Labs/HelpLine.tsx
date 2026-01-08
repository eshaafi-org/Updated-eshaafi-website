import { Text16, Text24 } from '@/components/Typography'
import Image from 'next/image'
import React from 'react'
import bnr1 from "../../../public/images/bnr1.png"
import Button from '@/components/Button'
import Link from 'next/link'
import { MdCall } from "react-icons/md";
import style from "@/styles/labs.module.scss"
import { trackEvent } from "@/lib/ga"

export default function HelpLine() {
    return (
        <>
            <section className='container pt-0'>
                <div className={style.helplineCom} >
                    <div className={style.helplineContent}>
                        <Image src={bnr1} alt='Help Line Image' width={100} height={100} />
                        <div className={style.helplineText}>
                            <Text24 className={style.helplineHeading}>Need help booking test?</Text24>
                            <Text16 className={style.helplineSubtext}>Our customer support is here for your help</Text16>
                        </div>
                    </div>
                    <a href={"tel:+923111151161"}>
                        <Button 
                          variant="contained" 
                          className={style.helplineButton}
                          onClick={() => trackEvent('labs_support_call_clk', {
                            section: 'support'
                          })}
                        >
                            <MdCall style={{ height: '20px', width: "20px" }} /> Call Now
                        </Button>
                    </a>
                </div>
            </section>
        </>
    )
}
