import Nav from "@/app/_components/Nav";

const PortfolioLayout: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default PortfolioLayout;
