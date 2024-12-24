import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Bookmarks from "./Bookmarks";

const page = () => {
    return (
        <>
            <Header />
            <Bookmarks />
            <Footer />
        </>
    );
}

export default page;