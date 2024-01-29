import { getRoom } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

function generateUniqueReceiptId() {
    const prefix = 'order'; // You can customize the prefix
    const timestamp = new Date().getTime(); // Current timestamp
    const random = Math.floor(Math.random() * 1000); // Random number (adjust as needed)

    // Combine the components to create a unique receipt ID
    const receiptId = `${prefix}_${timestamp}_${random}`;

    // Make sure the receipt ID is within 40 characters
    return receiptId.substring(0, 40);
}


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

type RequestData = {
    checkinDate: string;
    checkoutDate: string;
    adults: number;
    children: number;
    numberOfDays: number;
    hotelRoomSlug: string
}

export async function POST(req: Request , res: Response){
    const {checkinDate, adults, checkoutDate, children, hotelRoomSlug, numberOfDays}: RequestData = await req.json();

    if(!checkinDate || !checkoutDate || !adults || !hotelRoomSlug || !numberOfDays){
        return new NextResponse("Please Provide all fields, they all are required", {status: 400})
    }

    const origin = req.headers.get('origin');

    const session = await getServerSession(authOptions);

    if(!session){
        return new NextResponse("Authentication is Essential", {status: 400})
    };

    const userId = session.user.id;
    const formattedCheckoutDate = checkoutDate.split('T')[0];
    const formattedCheckinDate = checkoutDate.split('T')[0];

    try{
        const room = await getRoom(hotelRoomSlug);
        const discountPrice = room.price - (room.price /100)* room.discount;
        const totalPrice = discountPrice * numberOfDays;

        const receiptId = generateUniqueReceiptId();

        console.log("Will create order")

        const order = await razorpay.orders.create({
            amount: totalPrice * 100,
            currency: 'INR',
            receipt: receiptId,
            // payment_capture: true, 
        });
        console.log("about to return data")

        return NextResponse.json({

            orderId: order.receipt,
            amount: order.amount,
            currency: order.currency,
            notes: {
                adults,
                checkinDate,
                checkoutDate,
                children,
                hotelRoomSlug,
                hotelRoom: room._id,
                numberOfDays,
                user: userId,
                discount: room.discount,
                totalPrice
            },
        }, {
            status: 200,
            statusText: "Razorpay Order Created",
        });

    } catch(error:any){
        console.log("Payment failed !!", error);
        return new NextResponse("", {status:500})
    }
};
