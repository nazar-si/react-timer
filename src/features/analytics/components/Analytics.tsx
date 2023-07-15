import React from 'react';
import Modal from '../../../components/ui/Modal/Modal';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Analytics({ show, setShow }: Props) {
  return <Modal {...{ show, setShow }}>Test</Modal>;
}
