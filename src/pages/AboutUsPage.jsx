import React from "react";
import Header from "../components/Header";
import MiniBanner from "../toolbox/MiniBanner";
import Content from "../toolbox/Content";
import TitleAndParagraph from "../toolbox/TitleAndParagraph";
import Footer from "./Footer";

function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MiniBanner img="/banners/about-us.jpg" />
      <Content title="About Us">
        <p className="text-lg font-montserrat-regular">
          Embark on a journey of unparalleled luxury and seamless service with
          MIA Airlines. As a beacon of excellence in air travel, our commitment
          is to elevate every aspect of your flying experience. From the moment
          you step into our world, you'll find that MIA Airlines is not just an
          airline; it's a gateway to a new era of travel.
        </p>
        <TitleAndParagraph
          title="Our Story:"
          paragraph="Founded on a passion for excellence, MIA Airlines traces its roots to a shared vision of redefining the art of air travel. What started as a dream has blossomed into a reality—a reality where your journey is not merely a means of reaching a destination, but a carefully crafted experience that encapsulates the joy of exploration and the thrill of adventure. MIA Airlines is more than a mode of transportation; it's a testament to the extraordinary possibilities that unfold when dedication meets vision."
        />
        <TitleAndParagraph
          title="Our Commitment:"
          paragraph="At the core of MIA Airlines is an unwavering commitment to safety and customer satisfaction. We understand that your trust is our most valuable asset, and we take it seriously. MIA Airlines is proud to be staffed by a team of highly trained professionals, from our seasoned pilots to our attentive ground staff. Your journey with us is not just a flight; it's a voyage of comfort, security, and the assurance that you are in capable hands."
        />
        <TitleAndParagraph
          title="Innovation in the Skies:"
          paragraph="In a rapidly evolving world, MIA Airlines stays ahead of the curve by embracing cutting-edge technology and modern aircraft. We are not just committed to providing exceptional service; we are also dedicated to sustainable and eco-friendly practices. MIA Airlines takes pride in reducing our carbon footprint and contributing to a greener, more sustainable future for air travel."
        />
        <TitleAndParagraph
          title="A Global Network:"
          paragraph="MIA Airlines connects you to a world of possibilities with our extensive network of destinations. Whether you are a seasoned business traveler, a family embarking on a vacation, or an adventurer seeking new horizons, we have meticulously designed flights to cater to your unique needs. Your journey with MIA Airlines is not just about reaching a place; it's about experiencing the world."
        />
        <TitleAndParagraph
          title="Luxury Redefined:"
          paragraph="Step into our cabins, and you'll discover a realm where luxury meets functionality. MIA Airlines understands that your time in the air should be as enjoyable as your time on the ground. Our spacious seating, gourmet cuisine, and attention to detail redefine the concept of luxury in air travel. We invite you to indulge in the epitome of comfort and style with MIA Airlines."
        />
        <TitleAndParagraph
          title="Community and Beyond:"
          paragraph="MIA Airlines is more than just an airline; we are a community. We believe in making a positive impact on the world, and that starts with supporting local communities and participating in initiatives that promote social responsibility. When you choose MIA Airlines, you are not just choosing a flight; you are choosing to be a part of something greater—a movement towards a better, more connected world."
        />
        <TitleAndParagraph
          title="Fly with Confidence:"
          paragraph="Trust MIA Airlines to make your journey memorable, comfortable, and safe. Your adventure begins the moment you choose MIA Airlines, and we are honored to be a part of your travel story. From takeoff to landing, we are dedicated to ensuring that every aspect of your journey is a testament to the excellence that defines MIA Airlines."
        />
      </Content>
      <Footer />
    </div>
  );
}

export default AboutUsPage;
