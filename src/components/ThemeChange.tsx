import { useContext } from 'react';
import { Switch } from '@headlessui/react';
import { ThemeContext } from 'ThemeContext';

export default function ThemeChange() {
  const { theme, toggleTheme }: any = useContext(ThemeContext); // Use any type for simplicity

  return (
    <div className="flex flex-row items-center mx-8">
      {theme === 'light' && <span className='ml-2'>روز</span>}
      <Switch
        checked={theme === 'dark'} // Use theme value to determine if switch is checked
        onChange={toggleTheme} // Call toggleTheme to toggle theme
        className={`${theme === 'dark' ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${theme === 'dark' ? '-translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      {theme === 'dark' && <span className='mr-2'>شب</span>}
    </div>
  );
}
