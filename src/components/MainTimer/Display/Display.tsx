import { useState } from 'react';

import Modal from '../../ui/Modal/Modal';
import Settings from '@/features/settings/components/Settings/Settings';
import { IconClockExclamation, IconSettings2 } from '@tabler/icons-react';

import useTimerStore from '@/store/timer/timer';
import { useTranslation } from 'react-i18next';

import toClock from './toClock';
import { classNames } from '@/utls/classnames';
import useSettingsStore from '@/features/settings/store/settings';

type Props = {
  time: number;
  realMaxTime: number;
  active: boolean;
};

const clockStile =
  'text-7xl sm:text-8xl font-semibold text-center text-gray-900 dark:text-zinc-200 transition-all font-mono px-4';
const clockOut = '!text-red-500 dark:!text-red-300';
const shadowOut = '!shadow-[0_0_30px_#f898] !border-red-500';

const modes = {
  focus: {
    color: '#49f',
    border: '!border-blue-500',
    neon: '!shadow-[0_0_30px_#26fa]',
    text: '!text-blue-500 dark:!text-blue-200',
  },
  break: {
    color: '#0af',
    border: '!border-teal-500',
    neon: '!shadow-[0_0_30px_#0f88]',
    text: '!text-teal-500 dark:!text-teal-200',
  },
  longBreak: {
    color: '#40f',
    border: '!border-purple-500',
    neon: '!shadow-[0_0_30px_#a4f8]',
    text: '!text-indigo-500 dark:!text-indigo-200',
  },
};

export default function Display({ time, realMaxTime, active }: Props) {
  const mode = useTimerStore((state) => state.mode);
  const showSettings = useSettingsStore((state) => state.showModal)
  const setShowSettings = useSettingsStore((state) => state.setModal)
  const clockActive = `${modes[mode].text}`;
  const shadowActive = `${modes[mode].neon} ${modes[mode].border}`;
  const { t } = useTranslation();

  const round = false; // useSettingsStore(s=>s.roundedDisplay)

  return (
    <div
      className={classNames(
        'p-[2px] rounded-[1.1rem] relative self-center w-full',
        round && '!w-48 h-48 rounded-full flex items-center justify-center',
      )}
      style={{
        background:
          time <= 0
            ? '#f66'
            : `conic-gradient(${modes[mode].color}, ${modes[mode].color} ${
                100 - (time / realMaxTime) * 100
              }%, #0000 ${102 - (time / realMaxTime) * 102}%, #0000)`,
      }}
    >
      <div
        className={classNames(
          'absolute w-full h-full top-0 left-0 rounded-2xl blur-3xl -z-10 duration-500 transition-all safari-blur-fix',
          round && 'rounded-full',
        )}
        style={{
          background: `conic-gradient(${
            time <= 0 ? '#f040' : modes[mode].color
          }, ${time <= 0 ? '#f040' : modes[mode].color} ${
            100 - (time / realMaxTime) * 100
          }%, #0000 ${102 - (time / realMaxTime) * 102}%, #0000)`,
        }}
      ></div>
      <div
        className={classNames(
          'absolute w-full h-full top-0 left-0 rounded-2xl blur-3xl -z-10 bg-red-500 opacity-0 duration-500 transition-all',
          round && 'rounded-full',
        )}
        style={{ opacity: time <= 0 ? '1' : '0' }}
      ></div>
      <div className="absolute inset-4 rounded-2xl bg-white dark:bg-black" />
      <main
        className={classNames(
          'shadow-[0_1px_2px_0_#0001,0_0_0_#0000] p-4 rounded-2xl w-full h-full flex items-center justify-center',
          round && 'rounded-full',
          'bg-white/75 border-gray-200 dark:bg-zinc-800/50 dark:border-white/10 transition-all duration-300 border backdrop-blur-lg',
          `${active ? shadowActive : time <= 0 ? shadowOut : ''}`,
        )}
      >
        <div
          className={classNames(
            clockStile,
            round && '!text-5xl',
            active ? clockActive : time <= 0 ? clockOut : '',
            Math.abs(time) >= 3600 && '!text-6xl sm:!text-7xl',
          )}
        >
          <div
            className={classNames(
              'opacity-0 absolute top-4 left-4 transition-all duration-500',
              round && 'top-8 left-8',
              time < 0 && 'opacity-100',
            )}
          >
            <IconClockExclamation />
          </div>
          <button
            aria-label="settings"
            onClick={() => setShowSettings(true)}
            className={classNames(
              'text-gray-300 dark:text-zinc-700 transition-all absolute top-3 right-3 hover:text-gray-500 dark:hover:text-gray-400',
              round && 'top-8 right-8',
            )}
          >
            <IconSettings2 />
          </button>
          {toClock(time).map((s, i) => (
            <span
              key={
                i /** Here index is preserved between rerenders, it won't cause issues */
              }
            >
              {i !== 0 ? <span className="opacity-50 font-medium">:</span> : ''}
              {s}
            </span>
          ))}
        </div>
      </main>
      <Modal
        show={showSettings}
        setShow={setShowSettings}
        className="!max-w-sm"
      >
        <Settings />
      </Modal>
    </div>
  );
}
