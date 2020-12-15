import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './style.scss';

interface Props {
  show: boolean;
  onHide: () => void;
  variant?: 'success' | 'error';
  children: React.ReactNode;
}

const defaultProps = {
  variant: 'success',
};

const FeedbackModal = ({ show, onHide, variant, children }: Props) => {
  useEffect(() => {
    if (show)
      setTimeout(() => {
        onHide();
      }, 3000);
  }, [show]);

  return (
    show && (
      <Container className={`feedback-modal ${variant}`} onClick={onHide}>
        <p>{children}</p>
        <Button onClick={onHide} variant='link'>
          <img src='assets/images/crosscircle-icon.png' alt='close btn' />
        </Button>
      </Container>
    )
  );
};

FeedbackModal.defaultProps = defaultProps;
export default FeedbackModal;
