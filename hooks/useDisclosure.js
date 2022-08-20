import * as React from 'react';

function useDisclosure() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((val) => !val);

  return { isOpen, onOpen, onClose, onToggle };
}

export default useDisclosure;
