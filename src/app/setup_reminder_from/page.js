// app/page.js (or another route in App Router)
// import TopBar from '../components/TopBar';
// import CTReminder from '../components/CTReminder';
// import CTGallery from '../components/CTGallery';
// import BottomBar from '../components/BottomBar';

export default function Page() {
  // If you have dynamic style for the top container, define it here
  const styleTop = ''; // Replace with actual dynamic class if needed

  return (
    <div className="bg-white min-h-screen">
      {/* Top Navigation */}
      {/* <TopBar /> */}

      {/* Hero Header Section */}
      <div className={`container-xxl hero-header mb-0 ${styleTop} px-0 relative`}>
        {/* <CTReminder /> */}
      </div>

      {/* Gallery Section */}
      {/* <CTGallery /> */}

      {/* Footer / Bottom Bar */}
      {/* <BottomBar /> */}
    </div>
  );
}
