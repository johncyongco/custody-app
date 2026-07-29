import { NavLink } from "react-router-dom";
import { Home, Heart, BookOpen, Eye, User } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/map", icon: Heart, label: "Consecrate" },
  { to: "/consecrate", icon: BookOpen, label: "Prayers" },
  { to: "/custody", icon: Eye, label: "Custody" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 nav-glass">
      <div className="grid grid-cols-5 items-center h-[72px] pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="relative flex flex-col items-center gap-1 py-1.5 w-full"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={`transition-all duration-300 ${
                      isActive ? "text-holy-periwinkle" : "text-text-muted"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-medium tracking-wide transition-all duration-300 ${
                      isActive ? "text-holy-periwinkle" : "text-text-muted"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -top-0.5 w-6 h-[3px] rounded-full bg-holy-periwinkle" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
