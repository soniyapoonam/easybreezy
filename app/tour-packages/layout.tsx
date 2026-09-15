export default function TourPackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: "#inner-page-banner{display:none!important}",
        }}
      />
      {children}
    </>
  );
}
