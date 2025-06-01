import { JLHeaderComponent, CarouselComponent } from "@/components";
import { slide1, slide2, slide3 } from "@/assets/images";

const slides = [
    slide1.src,
    slide2.src,
    slide3.src,
    // Add more image paths as needed
  ];

function HomePage() {
    return(
        <>
        <JLHeaderComponent />
        <div className="flex items-center justify-center p-12">
            Welcome to CogMart
        </div>
        <div className="max-w-4xl mx-auto py-8">
            <CarouselComponent slides={slides} />
        </div>
        </>
    )
}

export default HomePage;