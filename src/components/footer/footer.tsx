import Link from "next/link";
import {BsFillSendFill, BsGlobeCentralSouthAsia, BsTelephoneOutbound} from "react-icons/bs";
import {BiMessageDetail} from "react-icons/bi";


const Footer = () =>{
    return (
        <footer className="mt-16 ">
            <div className="container mx-auto px-4">
                <Link href="/" className='font-black text-tertiary-dark'>
                    Hotelzz
                </Link>

                <h4 className="font-semibold text-[40px] py-6">Contact</h4>

                <div className="flex flex-wrap gap-16 items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center py-2">
                            <BsGlobeCentralSouthAsia/>
                            <p className="ml-2">Bhilar-Bhose Road, Bhilar Taluka: Mahabaleshwar District: Satara </p>
                        </div>
                        <div className="flex items-center py-2">
                            <BsFillSendFill />
                            <a className="ml-2" href='mailto:dastagirmulani333@gmail.com'>dastagirmulani333@gmail.com</a>
                        </div>
                        <div className="flex items-center py-2">
                            <BsTelephoneOutbound />
                            <a className="ml-2" href='tel:+918766455837'>+91 87664 55837</a>
                        </div>
                        <div className="flex items-center pt-2">
                            <BiMessageDetail />
                            <a className="ml-2" href="whatsapp://send?phone=+918766455837&text=Hi%20I%20want%20your%20help">Message Us !!</a>

                        </div>
                    </div>
                    <div className="flex-1 md:text-right">
                        <p className="pb-4">Our Story</p>
                        <p className="pb-4">Get in Touch</p>
                        <p className="pb-4">Our Privacy Commitment</p>
                        <p className="pb-4">Terms of Service</p>
                        <p>Customer Assistance</p>
                    </div>

                    <div className="flex-1 md:text-right">
                        <p className="pb-4">Dining Experience</p>
                        <p className="pb-4">Wellness</p>
                        <p className="pb-4">Fitness</p>
                        <p className="pb-4">Sports</p>
                        <p>Events</p>
                    </div>
                </div>
            </div>
            <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0" />
        </footer>
    )
}

export default Footer