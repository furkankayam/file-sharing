import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const element = document.documentElement;

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    }
  ];

  const onWindowMatch = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };

  onWindowMatch();

  useEffect(() => {
    onWindowMatch();
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    switch (newTheme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;

      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
    }
  };

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  return (
    <div className="fixed top-5 right-10 duration-100 dark:bg-slate-700 bg-gray-100 rounded">
      {options.map((opt) => (
        <button
          key={opt.text}
          onClick={() => handleThemeChange(opt.text)}
          className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${
            theme === opt.text && "text-sky-600"
          }`}
        >
        <ion-icon name={opt.icon}></ion-icon>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
