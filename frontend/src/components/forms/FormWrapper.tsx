import { Container } from 'react-bootstrap';

export const FormWrapper = ({ children }: { children: React.ReactNode }) => (
  <Container className='align-items-center d-flex justify-content-center mt-5'>
    <div className='w-100' style={{ maxWidth: '400px' }}>
      {children}
    </div>
  </Container>
);
