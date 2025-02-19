// pages/index.tsx
import React, { useEffect } from 'react'; // Import useEffect
import Menu from "./homepageComponents/menu.js";
import HomeSection from "./homepageComponents/home.js";
import Section4 from "./homepageComponents/section4.js";
import Section2 from "./homepageComponents/section2.js";
import Section3 from "./homepageComponents/section3.js";
import Section5 from "./homepageComponents/section5.js";
import Section6 from "./homepageComponents/section6.js";
import Section7 from "./homepageComponents/section7.js";
import Section8 from "./homepageComponents/section8.js";
import Section9 from "./homepageComponents/section9.js";
import Footer from "./homepageComponents/footer.js";
import { useRouter } from 'next/router'; // Import useRouter

export default function Home() {
const router = useRouter(); // Use useRouter hook

// The referral code handling is already done in _app.tsx,
// so we don't need to do anything specific here unless
// you want to display something different on the homepage
// if a referral code is present.  For example, you could
// show a welcome message.  I'll add a basic example of that,
// but it's optional.

useEffect(() => {
const { ref } = router.query;
if (ref) {
// You could do something here if you wanted to
// show a specific message or modify the UI based on
// the referral code.  For example:
// console.log("User arrived via referral code:", ref);
// setReferralMessage(Welcome! You were referred by ${ref});
}
}, [router.query]);

return (
<>
<Menu />
<main>
<HomeSection />
<Section4 />
<Section2 />
<Section3 />
<Section5 />
<Section6 />
<Section7 />
<Section8 />
<Section9 />
<Footer />
</main>
</>
);
}