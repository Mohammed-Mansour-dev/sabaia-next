import type { Metadata } from "next";

import {ClerkProvider} from "@clerk/nextjs"




export const metadata: Metadata = {
  title: "Sabaia Admin Auth",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        
    <html lang="en">
      <body
        className={`antialiased`}
      >
       <div style={{height:"100vh", display:"flex" ,justifyContent:"center",alignItems:"center"}} >
        {children}
       </div>
      </body>
    </html> 
    </ClerkProvider>
 
  );
}