import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <div className=' bg-background-secondary h-screen flex justify-center items-center'>
                {children}
        </div>
    );
};

export default layout;