import ButtonLink from "@/components/Button";

export const Nav = () => {
  return (
    <>
      <div className="fixed left-8 top-8 right-8 z-50 flex justify-between">
        <ButtonLink href="/menu">menu</ButtonLink>
        <ButtonLink href="/">j. stephen huang</ButtonLink>
        <ButtonLink href="/notes">notes</ButtonLink>
      </div>
      <div className="fixed left-8 bottom-8 right-8 z-50 flex justify-center text-secondary">
        514 836 8531 / js3huang@uwaterloo / linkedin / github
      </div>
    </>
  );
};
