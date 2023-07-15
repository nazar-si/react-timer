import React from 'react';
import Modal from '@/components/ui/Modal/Modal';
import TestChart from '../TestChart/TestChart';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Analytics({ show, setShow }: Props) {
  return (
    <Modal {...{ show, setShow }}>
      <TestChart />
    </Modal>
  );
}
