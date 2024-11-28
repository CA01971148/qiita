import React from "react";
import Footer from "@/app/components/Footer";
import FixPage from "@/app/components/FixPage";
import { Suspense } from "react";

const page = () => {
    return (
        <>
            <Suspense>
                <FixPage />
            </Suspense>
            <Footer />
        </>
    );
}

export default page;