'use client'
import React from 'react'
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
      </main>
      <Footer />
    </div>
  )
}

export default page
