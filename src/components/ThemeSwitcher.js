import moon_icon from "../imgs/moon_icon.svg";
import sun_icon from "../imgs/sun_icon.svg";
import { TEMAS, useThemeContext } from "../context/ThemeContext";

export const ThemeSwitcher = () => {
  const { tema, activarTema } = useThemeContext();

  return (
    <button
      onClick={() => {
        activarTema(tema === TEMAS.dark ? TEMAS.light : TEMAS.dark);
      }}
      className="z-20 flex w-fit items-center gap-4 rounded-lg p-1 px-3 text-sm transition-colors duration-200 hover:bg-neutral-800/40"
    >
      {tema === TEMAS.light ? (
        <>
          <img src={moon_icon} className="size-7" alt="Icono luna"></img>
        </>
      ) : (
        <>
          <img src={sun_icon} className="size-7" alt="Icono sol"></img>
        </>
      )}
    </button>
  );
};
