// Import your Razorpay library loader
import Razorpay from 'razorpay';

let razorpayPromise: Promise<any | null>; // Change the type accordingly

export const getRazorpay = () => {
    if (!razorpayPromise) {
        razorpayPromise = loadRazorpay(); // Replace this with your function to load Razorpay
    }
    console.log('Promise about to load')
    return razorpayPromise;
};

// Update the loadRazorpay function to use a script include
export const loadRazorpay = async () => {
    try {
        console.log('in Loadrazorpay')
        // const Razorpay = (await import('razorpay')).default;
        // Include the Razorpay script dynamically
        const razorpayScript = document.createElement('script');
        console.log("Creating script")
        razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
        console.log("Visited API")
        razorpayScript.async = true;


        
        // Wait for the script to load
        await new Promise<void>((resolve) => {
            razorpayScript.onload = () => {
                resolve();
            };
        });
        
        // Append the script to the document head
        document.head.appendChild(razorpayScript);
        console.log("appended script")

        // Initialize Razorpay with your key and secret
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID as string,
            key_secret: process.env.RAZORPAY_KEY_SECRET as string,
        });
        console.log("Done")

        return razorpay;
    } catch (error) {
        console.error('Failed to load Razorpay:', error);
        return null;
    }
};


// export const loadRazorpay = async () => {
//     try {
//         const Razorpay = (await import('razorpay')).default;

//         // Initialize Razorpay with your key
//         const razorpay = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID || '',
//             key_secret: process.env.RAZORPAY_KEY_SECRET || '',
//         });

//         return razorpay;
//     } catch (error) {
//         console.error('Failed to load Razorpay:', error);
//         return null;
//     }
// };


