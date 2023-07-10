import useTimerStore from '../../../store/timer/timer';
import toClock from './toClock';
import { classNames } from '../../../utls/classnames';
import { useTranslation } from 'react-i18next';
import { IconClockExclamation, IconSettings2 } from '@tabler/icons-react';
import Modal from '../../ui/Modal/Modal';
import { useState } from 'react';

type Props = {
  time: number;
  realMaxTime: number;
  active: boolean;
};

const clockStile =
  'text-7xl sm:text-8xl font-bold text-center text-gray-700 dark:text-zinc-200 transition-all font-mono px-4';
const clockOut = '!text-red-500 dark:!text-red-300';
const shadowOut = '!shadow-[0_0_30px_#f898] !border-red-500';

const modes = {
  focus: {
    color: '#04f',
    border: '!border-blue-500',
    neon: '!shadow-[0_0_30px_#4af8]',
    text: '!text-blue-500 dark:!text-blue-200',
  },
  break: {
    color: '#0cf',
    border: '!border-teal-500',
    neon: '!shadow-[0_0_30px_#4fc8]',
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
  const clockActive = `${modes[mode].text}`;
  const shadowActive = `${modes[mode].neon} ${modes[mode].border}`;
  const { t } = useTranslation();

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <div
      className="p-[3px] rounded-[1.1rem] relative"
      style={{
        background: `conic-gradient(${
          time <= 0 ? '#f040' : modes[mode].color
        }, ${time <= 0 ? '#f040' : modes[mode].color} ${
          100 - (time / realMaxTime) * 100
        }%, #0000 ${102 - (time / realMaxTime) * 102}%, #0000)`,
      }}
    >
      <div
        className="absolute w-full h-full top-0 left-0 rounded-2xl blur-3xl -z-10"
        style={{
          background: `conic-gradient(${
            time <= 0 ? '#f040' : modes[mode].color
          }, ${time <= 0 ? '#f040' : modes[mode].color} ${
            100 - (time / realMaxTime) * 100
          }%, #0000 ${102 - (time / realMaxTime) * 102}%, #0000)`,
        }}
      ></div>
      <div
        className="absolute w-full h-full top-0 left-0 rounded-2xl blur-3xl -z-10 bg-red-500 opacity-0 duration-500 transition-all"
        style={{ opacity: time <= 0 ? '1' : '0' }}
      ></div>
      <main
        className={classNames(
          'shadow-[0_0_10px_#0003,0_0_0_#0000] p-4 rounded-2xl',
          'bg-white border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 transition-all duration-300 border',
          `${active ? shadowActive : time <= 0 ? shadowOut : ''}`,
        )}
      >
        <div
          className={classNames(
            clockStile,
            active ? clockActive : time <= 0 ? clockOut : '',
          )}
        >
          <div
            className={classNames(
              'opacity-0 absolute top-4 left-4 transition-all duration-500',
              time < 0 && 'opacity-100',
            )}
          >
            <IconClockExclamation />
          </div>
          <button aria-label="settings" onClick={()=>setShowSettingsModal(true)} className="text-gray-100 dark:text-zinc-700 transition-all absolute top-4 right-4 hover:text-gray-500 dark:hover:text-gray-400">
            <IconSettings2/>
          </button>
          {toClock(time).map((s, i) => (
            <span
              key={
                i /** Here index is preserved between rerenders, it won't cause issues */
              }
            >
              {i !== 0 ? <span className="opacity-50">:</span> : ''}
              {s}
            </span>
          ))}
        </div>
      </main>
      <Modal show={showSettingsModal} setShow={setShowSettingsModal} className='max-w-sm'>
        <div className="w-full flex justify-center items-center">
          <span className="font-medium">Settings</span>: Comming soon
        </div>
      </Modal>
    </div>
  );
}
