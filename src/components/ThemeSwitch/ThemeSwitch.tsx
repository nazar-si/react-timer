import { Menu, Transition } from '@headlessui/react'
import { IconMoon, IconSun, IconDeviceDesktop } from "@tabler/icons-react"
import React from 'react';
import { useState } from 'react';
import useTheme from '../../hooks/useTheme';

const containerStyle = "rounded-md p-2 border border-gray-300 bg-white text-gray-700 shadow-sm outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 transition-all";
const itemStyle = "rounded-md p-1 transition-all";
const activeStyle = " bg-gray-100 dark:bg-zinc-700";
const buttonStyle = " relative w-10 h-10";
const iconStyle = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-0 scale-150 transition-all duration-500";
const showIconStyle = " opacity-100 rotate-[0] scale-[1]";

export default function ThemeSwitch({updateClass = false}) {
    const [selected, setSelected] = useTheme(updateClass);
    return (
        <Menu as="div" className="relative inline-block ring-0 ring-offset-0 ring-blue-500 focus-within:ring-2 focus-within:ring-offset-2 dark:ring-offset-black rounded-md transition-all">
            <Menu.Button className={containerStyle + buttonStyle}>
                <IconMoon strokeWidth={1.5} className={iconStyle + (selected==="dark"?showIconStyle:"")}/>
                <IconSun  strokeWidth={1.5} className={iconStyle + (selected==="light"?showIconStyle:"")}/>
                <IconDeviceDesktop strokeWidth={1.5} className={iconStyle + (selected==="system"?showIconStyle:"")  + " rotate-[0]" }/>
            </Menu.Button>
            <Transition
                as={React.Fragment}
                enter="transition ease-out"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
            <Menu.Items className={containerStyle + " !p-1 absolute top-12"}>
                <Menu.Item>
                    {({ active }) => (
                        <button onClick={$=>setSelected("dark")} className={itemStyle + (active?activeStyle:"")}>  
                            <IconMoon strokeWidth={1.5} color={selected==="dark"? '#08f':undefined}/>
                        </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <button onClick={$=>setSelected("light")} className={itemStyle + (active?activeStyle:"")}>  
                            <IconSun strokeWidth={1.5} color={selected==="light"?'#08f':undefined}/>
                        </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <button onClick={$=>setSelected("system")} className={itemStyle + (active?activeStyle:"")}>  
                            <IconDeviceDesktop strokeWidth={1.5} color={selected==="system"?'#08f':undefined}/>
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
            </Transition>
        </Menu>
  )
}