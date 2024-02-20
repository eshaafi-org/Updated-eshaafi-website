import { Text16, Text24 } from '@/components/Typography'
import Image from 'next/image'
import React from 'react'
import helpLine from "../../../public/images/helpLine.png"
import Button from '@/components/Button'
import Link from 'next/link'
import { MdCall } from "react-icons/md";
import style from "@/styles/labs.module.scss"

export default function HelpLine() {
    return (
        <>
            <section className='container pt-0'>
                <div className={style.helplineCom}>
                    <div className="d-flex align-items-center">
                        <Image src={helpLine} alt='Help Line Image' />
                        <span>
                            <Text24>Need help booking test?</Text24>
                            <Text16>Our customer support is here for your help</Text16>
                        </span>
                    </div>
                    <Button variant="contained" className="d-flex align-items-center gap-1 p-2">
                        <Link href={"tel:042-3230479"}>
                            <MdCall style={{ height: '24px', width: "24px" }} /> Call Now
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    )
}
