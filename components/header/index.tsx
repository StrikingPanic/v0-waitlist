import { basehub } from "basehub";
import { NavbarLink, NavbarLinkBackground } from "./link";
import clsx from "clsx";

export const Header = async () => {
  const {
    header: { navbar },
  } = await basehub().query({
    header: {
      navbar: {
        items: {
          href: true,
          _title: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="bg-slate-1 rounded-full">
        <div
          className={clsx(
            "bg-slate-1/95 backdrop-blur-sm rounded-full p-1 flex relative items-center border border-slate-5/50",
            "shadow-[0px_4px_12px_rgba(0,_0,_0,_0.08)]"
          )}
        >
          {/* Animated background */}
          <NavbarLinkBackground
            links={navbar.items.map((item) => item.href!)}
          />

          {/* Navigation items */}
          {navbar.items.map(({ href, _title }) => (
            <NavbarLink key={href} href={href ?? "/"}>
              {_title}
            </NavbarLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
