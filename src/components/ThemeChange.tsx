import { useState } from 'react'
import { Switch } from '@headlessui/react'


export default function ThemeChange() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex flex-row items-center mx-8 ">
        {enabled===false && <span className='ml-2'>روز</span>}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? '-translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
       
      </Switch>
      {enabled === true && <span className='mr-2'>شب</span>}
    </div>
  )
}
